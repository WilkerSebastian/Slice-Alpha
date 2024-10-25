import { useEffect, useRef } from "react";
import { SpriteSheetAnalyzer } from "../core/SpriteSheetAnalyzer";
import { Sprite } from "../core/Sprite";

export const SpriteRender = (props: { 
  image: HTMLImageElement | null, 
  handleSprites: (sprites: Sprite[]) => void 
}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !props.image) return; // Verifica se a referência está definida
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const padding = 10;
    const image = props.image;

    if (canvas && ctx && image) {
      
      canvas.width = image.width + padding * 2;
      canvas.height = image.height + padding * 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let k = 0;
      let l = 0;

      for (let i = 0; i < canvas.width; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
          ctx.fillStyle = (k + l) % 2 ? "#D2D2D2" : "#FDFDFD";
          ctx.fillRect(i, j, 10, 10);
          k++;
        }
        l++;
      }

      ctx.drawImage(image, padding, padding, image.width, image.height);

      const spriteAnalyzer = new SpriteSheetAnalyzer(image);
      const sprites = spriteAnalyzer.sliceSprites();

      props.handleSprites(sprites);

      ctx.strokeStyle = "red";
      sprites.forEach((sprite) =>
        ctx.strokeRect(
          sprite.x + padding,
          sprite.y + padding,
          sprite.width,
          sprite.height
        )
      );

    }
  }, [props.image]);

  return (
    <div className="flex justify-center items-center max-w-[90vw] max-h-[90vh] overflow-auto border border-gray-300 bg-gray-100">
      <canvas ref={canvasRef} className="border border-white" />
    </div>
  );
};
