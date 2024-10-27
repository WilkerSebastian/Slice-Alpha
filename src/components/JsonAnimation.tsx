import { useState } from "react";
import { AnimationData } from "../core/AnimationData";
import { Sprite } from "../core/Sprite";
import { AnimationForm } from "./AnimationForm";

export const JsonAnimation = (props: { handleAnimation: (animation: AnimationData) => void, animationData: AnimationData, file: string, sprites: Sprite[] }) => {
    
    const [json, setJson] = useState("[]");

    const handleJsonAniamtionData = (anim: AnimationData) => {

      props.handleAnimation(anim);;

      setJson(anim.formatJson())

    }

    return (<>
        <article className="my-4">
          <AnimationForm handleAnimation={handleJsonAniamtionData} animationData={props.animationData} file={props.file} sprites={props.sprites} />
          <div className="bg-gray-700 text-white p-4 rounded-md overflow-auto max-w-full max-h-96 min-w-96">
            <pre className="whitespace-pre-wrap">
              <code className="text-sm font-mono">
                {json}
              </code>
            </pre>
          </div>
        </article>
    </>);

} 