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
        
        const baseStagger = 2;       
        const exponent = 0.6;        
        const scalingFactor = 1.2;   
    
        return Math.max(1, Math.floor(baseStagger + Math.pow(totalFrames, exponent) * scalingFactor));

    }
    

    public render(ctx: CanvasRenderingContext2D, x: number, y: number, width:number, height: number) {

        if (!this.animation || !this.image)
            return
        
        const index = Math.floor(this.frame / this.animation.stagger) % this.animation.slices.length;

        const slice = this.animation.slices[index];

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

        this.frame++;

    }

    public setAnimation(name: string) {

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

    public setStaggerFrame(staggerFrame: number) {

        if(this.animation)
            this.animation.stagger = staggerFrame;
    
    }

    public formatJson() {
        return JSON.stringify(this.animations, null, 2);
    }

    public getAnimationsName() {
        return this.animations.map(animation => animation.name);
    }

    public getSizeAnimation() {
        return this.animation?.pixel
    }

    public getCurrentAnimation() {
        return this.animation
    }

    public getStaggerFrame() {
        return this.animation?.stagger ?? 0
    }

    public getAnimations() {
        return this.animations
    }

}