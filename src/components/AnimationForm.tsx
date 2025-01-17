import { useState } from "react";
import { AnimationData } from "../core/AnimationData";
import { Sprite } from "../core/Sprite";
import { useLang } from "../hooks/useLang";

export const AnimationForm = (props: {
  handleAnimation: (setAnimation: AnimationData) => void,
  animationData: AnimationData,
  file: string,
  sprites: Sprite[]
}) => {

  const { lang } = useLang();
  const [animationName, setAnimationName] = useState<string>('');

  const handleAdd = () => {
    if (!animationName) 
      return; 

    props.animationData.addAnimation(animationName, props.file ?? "", props.sprites);
    props.handleAnimation(props.animationData);
  }
  
  const handleUpdate = () => {
    if (!animationName) 
      return; 

    props.animationData.update(animationName, props.file ?? "", props.sprites);
    props.handleAnimation(props.animationData);
  }
  
  const handleRemove = () => {
    if (!animationName) 
      return; 

    props.animationData.remove(animationName);
    props.handleAnimation(props.animationData);
  }

  const handleClear = () => {
    props.animationData.clear();
    props.handleAnimation(props.animationData) 
  }

  const handleButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const type = e.currentTarget.innerText;
    
    if (type === lang.add)
      handleAdd();

    else if (type === lang.update)
      handleUpdate();

    else if (type === lang.remove)
      handleRemove();

    else if (type === lang.clear)
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
          { lang.animationName }
        </label>
      </div>
      <div className="flex justify-center space-x-2 mt-3">
        <button
          type="button"
          onClick={handleButton}
          className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300 text-sm lg:text-1xl"
        >
          { lang.add }
        </button>
        <button
          type="button"
          onClick={handleButton}
          className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-700 transform hover:scale-105 transition duration-300 text-sm lg:text-1xl"
        >
          { lang.update }
        </button>
        <button
          type="button"
          onClick={handleButton}
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transform hover:scale-105 transition duration-300 text-sm lg:text-1xl"
        >
          { lang.remove }
        </button>
        <button
          type="button"
          onClick={handleButton}
          className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-700 transform hover:scale-105 transition duration-300 text-sm lg:text-1xl"
        >
          { lang.clear }
        </button>
      </div>
    </form>
  );
};
