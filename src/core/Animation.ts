import { Sprite } from "./Sprite"

export class Animation {

    public name: string
    public source: string
    public pixel: {width:number, height:number}
    public slices: Sprite[]
    public stagger: number

    constructor(name: string, source: string, pixel: {width:number, height:number}, slices: Sprite[], stagger: number) {
        this.name = name
        this.source = source
        this.pixel = pixel
        this.slices = slices
        this.stagger = stagger
    }

}