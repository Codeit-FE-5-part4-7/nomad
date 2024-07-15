import DropdownMenu from '@/components/DropdownMenu';
import { dropFilterCategories } from '@/constant/filterCategoryOptions';
import React, { useState } from 'react';

interface FilterDropButtonProps {
  text: string;
}

function FilterDropButton({ text }: FilterDropButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(text);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const filterCategoryClick = (optionText: string) => {
    setCurrentOption(optionText);
    setIsOpen(false);
  };

  const dropFilterCategoryList = dropFilterCategories(filterCategoryClick);

  return (
    <div>
      <button
        type='button'
        onClick={handleToggle}
        className='sm:w-[16rem] w-[10.7rem] px-[2rem] py-[1.6rem] rounded-[1.5rem] border text-[#0B3B2D] text-[1.8rem] font-[500] bg-[#FFFFFF] border-[#0B3B2D] flex items-center justify-between'
      >
        {currentOption}
        <span className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </button>
      {isOpen && <DropdownMenu type='gnb' dropdownMenuList={dropFilterCategoryList} />}
    </div>
  );
}

export default FilterDropButton;
