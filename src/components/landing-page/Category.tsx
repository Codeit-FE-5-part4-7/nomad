/* eslint-disable */

interface CategoryProps {
  category: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  isActive?: boolean;
  onClick: (category: string) => void;
}

export default function Category({ category, isActive = false, onClick }: CategoryProps) {
  const handleClick = () => {
    onClick(category);
  };

  return (
    <div
      className={`flex items-center justify-center w-fit flex-shrink-0 
		md:px-[3rem] md:py-[1.6rem] md:text-[1.8rem] px-[2rem] py-[1rem] text-[1.6rem] gap-[1rem] rounded-[1.5rem] 
		border border-[#0b3b2d] font-medium  
		text-center cursor-pointer 
		${isActive ? 'bg-[#0b3b2d] text-white hover:bg-[#112211] ' : 'bg-white text-[#0b3b2d] hover:bg-[#eee] '}`}
      onClick={handleClick}
    >
      {category}
    </div>
  );
}

/* eslint-enable */
