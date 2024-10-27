import { useEffect, useState } from "react";
import { AnimationData } from "../core/AnimationData";
import { Sprite } from "../core/Sprite";
import { AnimationForm } from "./AnimationForm";

export const JsonAnimation = (props: { handleAnimation: (animation: AnimationData) => void, animationData: AnimationData, file: string, sprites: Sprite[] }) => {
    
    const [json, setJson] = useState("[]");

    useEffect(() => {
    
        setJson(props.animationData.formatJson());
    
    }, [props.animationData]);

    const handleAnimation = (animation: AnimationData) => props.handleAnimation(animation);
    
    return (<>
        <article className="my-4">
          <AnimationForm handleAnimation={handleAnimation} animationData={props.animationData} file={props.file} sprites={props.sprites} />
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