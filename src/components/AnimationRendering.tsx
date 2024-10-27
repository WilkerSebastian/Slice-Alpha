import { useEffect, useState } from "react";
import { AnimationData } from "../core/AnimationData";

export const AnimationRendering = (props: { animation: AnimationData }) => {

    const [animation, setAnimation] = useState<AnimationData>(props.animation);
    const [animationNames, setAnimationNames] = useState<string[]>([]);
    const [staggerFrame, setStaggerFrame] = useState<number>(animation.getStaggerFrame());

    useEffect(() => {
        setAnimation(props.animation);
    }, [props.animation]);

    useEffect(() => {

        const names = animation.getAnimationsName();

        if (names.length !== animationNames.length) {

            setAnimationNames(names);

            if (!animation.getCurrentAnimation() && names.length > 0) {
                animation.setAnimation(names[0]);
                setAnimation(animation); 
                setStaggerFrame(animation.getStaggerFrame());
            }

        }

    }, [animation, animationNames]);

    useEffect(() => {  
          
        const canvas = document.getElementById("animationCanvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const maxSize = 256;
        const minSize = 256;
        const renderTransform = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }

        let id:number;
        let scale:number;
        
        if (ctx) {

            const size = animation.getSizeAnimation();

            if (size) {

                canvas.width = maxSize;
                canvas.height = maxSize;

                scale = Math.min(
                    canvas.width / size.width,
                    canvas.height / size.height,
                    maxSize / Math.max(size.width, size.height)
                ); 

                scale = Math.max(scale, minSize / Math.min(size.width, size.height));

                renderTransform.width = size.width * scale;
                renderTransform.height = size.height * scale;

                if (renderTransform.height > canvas.height) 
                    scale = canvas.height / size.height;

                renderTransform.width = size.width * scale;
                renderTransform.height = size.height * scale;

                renderTransform.x = (canvas.width - renderTransform.width) / 2;
                renderTransform.y = (canvas.height - renderTransform.height) / 2;

            }

        }

        const renderFrame = () => {

            if (canvas && ctx) {

                ctx.imageSmoothingEnabled = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                let k = 0, l = 0;
                for (let i = 0; i < canvas.width; i += 10) {
                    for (let j = 0; j < canvas.height; j += 10) {
                        ctx.fillStyle = (k + l) % 2 ? "#D2D2D2" : "#FDFDFD";
                        ctx.fillRect(i, j, 10, 10); 
                        k++;
                    }
                    l++;
                }

                const { x, y, width, height } = renderTransform;

                console.log(x, y, width, height);
                

                animation.render(ctx, x, y, width, height);
            }

            id = requestAnimationFrame(renderFrame);
        };

        id = requestAnimationFrame(renderFrame);

        return () => cancelAnimationFrame(id);

    }, [animation]);

    const handleAnimation: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const animationName = e.currentTarget.value;
        animation.setAnimation(animationName);
        setAnimation(animation);
    };

    const handleStaggerFrameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const newStaggerFrame = parseInt(e.currentTarget.value, 10);
        setStaggerFrame(newStaggerFrame);
        animation.setStaggerFrame(newStaggerFrame);
    };

    return (
        <article>
            <select onChange={handleAnimation}>
                {animationNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
            <canvas id="animationCanvas" width={256} height={256}></canvas>
            <div className="flex items-center space-x-2 mt-4">
                <label className="text-white">Stagger Frame:</label>
                <input
                    type="range"
                    min="1"
                    max="30"
                    value={staggerFrame}
                    onChange={handleStaggerFrameChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white">{staggerFrame}</span>
            </div>
        </article>
    );
};
