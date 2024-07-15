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
      className={`flex items-center justify-center w-fit flex-shrink-0 py-4 px-6 gap-2.5 rounded-[1.5rem] border border-darkgreen bg-white text-[1.8rem] font-medium text-darkgreen text-center cursor-pointer transition-all duration-200
		  hover:bg-gray-200
		  ${isActive ? 'bg-darkgreen text-white hover:bg-gray-800' : ''}
		  sm:text-[1.6rem] sm:py-2.5 sm:px-5`}
      onClick={handleClick}
    >
      {category}
    </div>
  );
}
/* eslint-enable */
