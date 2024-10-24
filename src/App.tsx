// src/App.tsx
import React, { useState } from 'react';
import { LoadImage } from './components/LoadImage';
import { SpriteRender } from './components/SpriteRender';

export const App: React.FC = () => {

    const [image, setImage] = useState<HTMLImageElement | null>(null);

    const handleImage = (img:HTMLImageElement) => {
        setImage(img)
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-5">
            <div className='text-white mt-4 mb-auto'>
                <h1 className=" text-5xl mb-5 text-center f-game text-red-600">Slice Alpha</h1>
                <p> Slice Alpha is an auto slicer for sprite sheets that exports in the json format used in Gama Source </p>
            </div>
            <div className='mb-auto'>
                <LoadImage handleImage={handleImage} />
                <SpriteRender image={image}/>
            </div>
        </main>
    );

};