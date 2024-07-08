import React from 'react';

interface Props {
  text: string;
  color: 'black' | 'white';
  onClick: () => void | Promise<void>;
  width?: string;
  height?: string;
}

function CustomButton({ text, color, onClick, width = 'w-full', height = 'h-full' }: Props) {
  const backgroundColor = color === 'black' ? 'bg-[#112211]' : 'bg-[#ffffff]';
  const borderColor = color === 'white' ? 'border-[#000000]' : 'border-[#112211]';
  const textColor = color === 'black' ? 'text-[#ffffff]' : 'text-[#112211]';

  const handleClick = () => {
    onClick();
  };

  return (
    <button type='button' onClick={handleClick} className={`flex justify-center items-center px-5 py-3 ${width} ${height} font-bold border ${borderColor} ${backgroundColor} ${textColor} rounded-md`}>
      {text}
    </button>
  );
}

export default CustomButton;
