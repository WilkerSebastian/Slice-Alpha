import { Sprite } from "./Sprite";

export class SpriteSheetAnalyzer {

    private imageData: ImageData;
    private visited: boolean[][];
    private sprites: Sprite[] = [];
    private width: number;
    private height: number;

    constructor(image: HTMLImageElement) {

        this.imageData = this.getImageData(image);
        this.width = this.imageData.width;
        this.height = this.imageData.height;
        this.visited = Array.from({ length: this.height }, () => Array(this.width).fill(false));

    }

    public sliceSprites(): Sprite[] {

        for (let y = 0; y < this.height; y++) 
            for (let x = 0; x < this.width; x++) 
                if (this.isPixelSolid(x, y) && !this.visited[y][x]) {

                    const sprite = this.floodFill(x, y);

                    if (sprite) 
                        this.sprites.push(sprite);
                    
                }

        return this.sprites;

    }

    private isPixelSolid(x: number, y: number): boolean {

        const index = (y * this.width + x) * 4;
        const alpha = this.imageData.data[index + 3];
        return alpha > 0; 

    }
    
    private floodFill(startX: number, startY: number): Sprite | null {

        const stack: [number, number][] = [[startX, startY]];
        let minX = startX;
        let maxX = startX;
        let minY = startY;
        let maxY = startY;

        while (stack.length > 0) {

            const [x, y] = stack.pop()!;

            if (x < 0 || x >= this.width || y < 0 || y >= this.height || this.visited[y][x])
                continue;
            
            this.visited[y][x] = true;
            
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);

            if (this.isPixelSolid(x, y)) {

                stack.push([x + 1, y]); 
                stack.push([x - 1, y]); 
                stack.push([x, y + 1]); 
                stack.push([x, y - 1]); 

            }

        }

        const width = maxX - minX + 1;
        const height = maxY - minY + 1;

        
        if (width < 5 || height < 5) 
            return null;
        
        let hasConnectedPixels = false;
        
        for (let y = minY; y <= maxY; y++) 
            for (let x = minX; x <= maxX; x++) 
                if (this.isPixelSolid(x, y)) {
                    
                    if (
                        this.isPixelSolid(x - 1, y) ||
                        this.isPixelSolid(x + 1, y) ||
                        this.isPixelSolid(x, y - 1) ||
                        this.isPixelSolid(x, y + 1)
                    ) {
                        hasConnectedPixels = true;
                        break;
                    }

                }

        if (!hasConnectedPixels) 
            return null;

        return { x: minX, y: minY, width, height };

    }
    
    private getImageData(image: HTMLImageElement): ImageData {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) 
            throw new Error("Fail to get context 2D");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        return ctx.getImageData(0, 0, canvas.width, canvas.height);

    }
    
}