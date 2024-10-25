import { Sprite } from "./Sprite";
import { Animation } from "./Animation";

export class AnimationData {
    
    private animations: Animation[];
    private frame: number;
    private animation: Animation | null;
    private image: HTMLImageElement | null;

    constructor(animationData?: AnimationData) {
        this.animations = animationData?.animations || [];
        this.frame = 0;
        this.animation = null;
        this.image = null;
    }

    public addAnimation(name: string, file:string, sprites: Sprite[]) {

        if (this.hasAnimation(name))
            return

        const animation = new Animation(
            name, 
            file, 
            { 
                width: sprites[0].width, 
                height: sprites[0].height
            }, 
            sprites, 
            this.calculateStaggerFrame(sprites.length)
        );

        this.animations.push(animation);

    }

    private calculateStaggerFrame(totalFrames: number): number {
        return Math.max(1, Math.floor(totalFrames / 10));
    }

    public render(ctx: CanvasRenderingContext2D, x: number, y: number) {

        if (!this.animation || !this.image)
            return
        
        const index = Math.floor(this.frame / this.animation.stagger) % this.animation.slices.length;

        const slice = this.animation.slices[index];

        let { width, height } = slice;

        width = Math.min(Math.max(width, 64), 512);
        height = Math.min(Math.max(height, 64), 512);

        ctx.drawImage(
            this.image,
            slice.x,
            slice.y,
            slice.width,
            slice.height,
            x,
            y,
            width,
            height
        );

    }

    public setAniamtion(name: string) {

        const animation = this.animations.filter(animation => animation.name === name)[0];

        if (!animation)
            throw new Error(`Animation ${name} not found`);

        this.animation = animation;
        this.frame = 0;

        const source = localStorage.getItem(animation.source);

        if (!source)
            throw new Error(`Animation ${animation.source} not found in localStorage`);
    
        const image = new Image();
        image.onload = () => this.image = image;
        image.src = source;

        this.image = image

    }

    public update(name: string, file:string, sprites: Sprite[]) {

        if (!this.hasAnimation(name))
            return

        let index = -1

        for (let i = 0; i < this.animations.length; i++) {
            
            if (this.animations[i].name === name)
                index = i;
            
        }

        if (index == -1)
            return

        const animation = new Animation(
            name, 
            file, 
            { 
                width: sprites[0].width, 
                height: sprites[0].height
            }, 
            sprites, 
            this.calculateStaggerFrame(sprites.length)
        );

        this.animations[index] = animation

    }

    private hasAnimation(name: string) {
        return this.animations.some(animation => animation.name === name);
    }

    public remove(name: string) {
        this.animations = this.animations.filter(animation => animation.name !== name); 
    }

    public clear() {
        this.animations = [];
    }

    public setFrame(frame: number) {
        this.frame = frame;
    }

    public formatJson() {
        return JSON.stringify(this.animations, null, 2);
    }

}