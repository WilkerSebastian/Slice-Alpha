import React from 'react';

export const LoadImage = (props: { handleImage: (img: HTMLImageElement) => void, handleImageName: (name: string) => void }) => {

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const img = new Image();
        img.src = base64String;
        img.onload = () => {
          props.handleImage(img);
          props.handleImageName(file.name);
          localStorage.setItem(file.name, base64String);
        };
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="mb-4 p-2 bg-gray-800 text-white rounded-md"
    />
  );
};