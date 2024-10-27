import React, { useState } from 'react';
import { LoadImage } from './components/LoadImage';
import { SpriteRender } from './components/SpriteRender';
import { JsonAnimation } from './components/JsonAnimation';
import { AnimationData } from './core/AnimationData';
import { Sprite } from './core/Sprite';
import { AnimationRendering } from './components/AnimationRendering';
import { DownloadButton } from './components/DownloadButton';
import { useLang } from './hooks/useLang';

export const App: React.FC = () => {

    const { lang } = useLang();
    const [sprites, setSprites] = useState<Sprite[]>([]);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [imageName, setImageName] = useState<string>('');
    const [animationData, setAnimationData] = useState<AnimationData>(new AnimationData());

    const handleAnimation = (animation: AnimationData) => {
        setAnimationData(new AnimationData(animation));
    };

    return (
        <>
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-5">
            <div className='text-white mt-4 mb-8 w-3/5'>
                <h1 className=" text-5xl mb-5 text-center f-game text-red-600">Slice Alpha</h1>
                <p> { lang.readme } </p>
            </div>
            <div className='mb-auto'>
                <LoadImage handleImage={setImage} handleImageName={setImageName} />
                <SpriteRender image={image} handleSprites={setSprites}/>
            </div>
            <section className='flex justify-evenly w-full min-h-96'>
                <JsonAnimation handleAnimation={handleAnimation} animationData={animationData}  file={imageName} sprites={sprites} />
                <AnimationRendering handleAnimation={setAnimationData} animation={animationData}/>
            </section>
        </main>
        <DownloadButton data={animationData.formatJson()} />
        </>
    );

};