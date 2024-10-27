import { useEffect, useState } from "react";
import { AnimationData } from "../core/AnimationData";
import { Sprite } from "../core/Sprite";
import { AnimationForm } from "./AnimationForm";

export const JsonAnimation = (props: { handleAnimation: (animation: AnimationData) => void, animationData: AnimationData, file: string, sprites: Sprite[] }) => {
    
    const [json, setJson] = useState("[]");

    useEffect(() => {
    
        setJson(props.animationData.formatJson());
    
    }, [props.animationData]);
    
    return (<>
        <article className="my-4">
          <AnimationForm handleAnimation={props.handleAnimation} animationData={props.animationData} file={props.file} sprites={props.sprites} />
          <div className="bg-gray-700 text-white p-4 rounded-md overflow-auto w-full">
            <pre className="whitespace-pre-wrap">
              <code className="text-sm font-mono">
                {json}
              </code>
            </pre>
          </div>
        </article>
    </>);

} 