import { useState } from "react";
import { AnimationData } from "../core/AnimationData";
import { Sprite } from "../core/Sprite";

export const AnimationForm = (props: {
    handleAnimation: (animation: AnimationData) => void,
    animationData: AnimationData,
    file: string,
    sprites: Sprite[]
}) => {

    const [animationName, setAnimationName] = useState<string>('');
    const [animation] = useState<AnimationData>(new AnimationData(props.animationData))

    const handleAdd = () => {
        if (!animationName) 
            return; 

        animation.addAnimation(animationName, props.file ?? "", props.sprites);
        props.handleAnimation(animation);
    }
    
    const handleUpdate = () => {
        if (!animationName) 
            return; 

        animation.update(animationName, props.file ?? "", props.sprites);
        props.handleAnimation(animation);
    }
    
    const handleRemove = () => {
        if (!animationName) 
            return; 

        animation.remove(animationName);
        props.handleAnimation(animation);
    }

    const handleClear = () => {
        animation.clear();
        props.handleAnimation(animation) 
    }

    const handleButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const type = e.currentTarget.innerText;
        
        if (type === "Add")
            handleAdd();

        else if (type === "Update")
            handleUpdate();

        else if (type === "Remove")
            handleRemove();

        else if (type === "Clear")
            handleClear();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 rounded-md">
            <div className="relative">
                <input
                    id="name"
                    type="text"
                    onChange={e => setAnimationName(e.target.value)}
                    className="peer bg-black bg-opacity-50 px-4 pt-6 pb-2 w-full rounded border border-cyan-400 text-white focus:ring-2 outline-none invalid:border-red-500"
                />
                <label
                    htmlFor="name"
                    className="absolute text-cyan-400 left-3 scale-75 top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2 duration-300"
                >
                    Animation Name
                </label>
            </div>
            <div className="flex justify-center space-x-2 mt-3">
                <button
                    type="button"
                    onClick={handleButton}
                    className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Add
                </button>
                <button
                    type="button"
                    onClick={handleButton}
                    className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition duration-300"
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={handleButton}
                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                    Remove
                </button>
                <button
                    type="button"
                    onClick={handleButton}
                    className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-300"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};