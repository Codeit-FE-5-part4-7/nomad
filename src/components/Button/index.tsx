import React from 'react';

interface Props {
  text: string;
  color: 'black' | 'white';
  onClick: () => void;
  width?: string;
  height?: string;
  link?: string;
  disabled?: boolean;
}

function Button({ text, color, onClick, width = 'w-full', height = 'h-full', link, disabled = false }: Props) {
  const enabledBackgroundColor = color === 'black' ? 'bg-[#112211]' : 'bg-[#ffffff]';
  const enabledBorderColor = color === 'white' ? 'border-[#000000]' : 'border-[#112211]';
  const enabledTextColor = color === 'black' ? 'text-[#ffffff]' : 'text-[#112211]';

  const backgroundColor = disabled ? 'bg-[#a4a1aa]' : enabledBackgroundColor;
  const borderColor = disabled ? 'bg-[#a4a1aa]' : enabledBorderColor;
  const textColor = disabled ? 'text-[#ffffff]' : enabledTextColor;

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const buttonStyle = `flex justify-center items-center px-5 py-3 ${width} ${height} font-bold border ${borderColor} ${backgroundColor} ${textColor} rounded-md ${
    disabled ? 'cursor-not-allowed' : ''
  }`;

  return link && !disabled ? (
    <a href={link} className={buttonStyle}>
      {text}
    </a>
  ) : (
    <button type='button' onClick={handleClick} className={buttonStyle} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
