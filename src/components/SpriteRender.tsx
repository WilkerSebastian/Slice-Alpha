import { useEffect, useRef } from "react";
import { SpriteSheetAnalyzer } from "../core/SpriteSheetAnalyzer";

export const SpriteRender = (props: {image: HTMLImageElement | null}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const image = props.image;
  
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const padding = 10; 
  
    if (canvas && ctx && image) {
      
      canvas.width = image.width + padding * 2;
      canvas.height = image.height + padding * 2;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let k = 0;
      let l = 0;
  
      for (let i = 0; i < canvas.width; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
          ctx.fillStyle = (k + l) % 2 ? '#D2D2D2' : '#FDFDFD';
          ctx.fillRect(i, j, 10, 10);
          k++;
        }
        l++;
      }
      
      ctx.drawImage(image, padding, padding, image.width, image.height);

      const spriteAnalyzer = new SpriteSheetAnalyzer(image);
      const sprites = spriteAnalyzer.sliceSprites();

      ctx.strokeStyle = 'red';

      sprites.forEach((sprite) => ctx.strokeRect(
        sprite.x + padding, 
        sprite.y + padding, 
        sprite.width, 
        sprite.height
      ))

    }
  }, [props.image]);

  return <canvas ref={canvasRef} className="border border-white"></canvas>

}