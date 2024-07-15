import React from 'react';

interface CategoryButtonProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function CategoryButton({ text, isSelected = false, onClick = () => {} }: CategoryButtonProps): JSX.Element {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`sm:w-[12.7rem] py-[1.6rem] w-[10rem] rounded-[1.5rem] border sm:text-[1.8rem] text-[1.6rem] font-[500] transition-all 
        ${isSelected ? 'bg-[#0B3B2D] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#0B3B2D] border-[#0B3B2D]'}
        hover:bg-[#0B3B2D] hover:text-[#FFFFFF]`}
    >
      {text}
    </button>
  );
}
