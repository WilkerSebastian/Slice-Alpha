import { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';

export const DownloadButton = (props:{ data: string }) => {

  const [isHovered, setIsHovered] = useState(false);

  const downloadJson = () => {
    const json = props.data
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "animation.json";
    link.click();
    URL.revokeObjectURL(url); 
  };

  return (
    <div
      className={`fixed bottom-4 left-4 flex items-center justify-center ${isHovered && "scale-110"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={downloadJson}
        className="text-3xl bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600"
      >
        <DownloadIcon fontSize="small"/>
      </button>
      {isHovered && (
        <span className={`absolute left-16 bottom-0 bg-gray-800 text-white text-sm rounded px-2 py-1 transition-transform duration-300 ease-in-out ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
          Baixar JSON
        </span>
      )}
    </div>
  );
};