export const LoadImage = (props: {handleImage: (img:HTMLImageElement) => void}) => {
    
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          props.handleImage(img);
        };
      }
  };
  
  return (
      <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="mb-4 p-2 bg-gray-800 text-white rounded-md"
    />)
    
}