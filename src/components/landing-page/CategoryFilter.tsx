import { ICON } from '@/constant';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import useCategoryFilterStore from '@/utils/landing-page/useCategoryFilterStore';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import Category from './Category';
/* eslint-disable */
export default function CategoryFilter() {
  const [categoryState, setCategoryState] = useState('');
  const [filterState, setFilterState] = useState('');
  const [categoryXState, setCategoryXState] = useState(0);

  const translateSize = useResponsiveSize(1, 1, 2, 3);
  const categoryRef = useRef<HTMLUListElement>(null);

  const { mainCategory, setMainCategory, mainFilter, setMainFilter } = useCategoryFilterStore();

  const categoryList: ('문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙')[] = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  const handleCategoryClick = (category: string) => {
    setFilterState('');
    if (category === categoryState) {
      setCategoryState('');
      return;
    }
    setCategoryState(category);
  };

  const handleButtonClick = (direction: number) => {
    const newIndex = categoryXState + direction;

    if (newIndex >= 0 && newIndex <= translateSize) {
      setCategoryXState(newIndex);
    }
  };

  useEffect(() => {
    if (categoryRef.current !== null) {
      categoryRef.current.style.transition = 'all 0.5s ease-in-out';
    }

    if (categoryRef.current !== null) {
      categoryRef.current.style.transform = `translateX(-${categoryXState * 50}%)`;
    }
  }, [categoryXState, translateSize]);

  useEffect(() => {
    setMainCategory(categoryState);
    setFilterState('');
    setMainFilter('');
  }, [categoryState, setMainCategory, setMainFilter]);

  useEffect(() => {
    setMainFilter(filterState);
  }, [filterState, setMainFilter]);

  return (
    <div className='flex justify-between items-center w-full min-w-0'>
      <div className='relative flex items-center min-w-0'>
        <div className='overflow-hidden'>
          <ul className='flex gap-6 sm:gap-4 md:gap-2' ref={categoryRef}>
            {categoryList.map((category, index) => (
              <li key={`${category}-${index}`} className='flex-shrink-0'>
                <Category category={category} isActive={categoryState === category} onClick={handleCategoryClick} />
              </li>
            ))}
          </ul>
        </div>
        {categoryXState !== 0 && (
          <div className='absolute left-0 w-20 h-14 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200'>
            <button onClick={() => handleButtonClick(-1)} className='rotate-180'>
              <Image src={ICON.rightArrow.default.src} alt={ICON.rightArrow.default.alt} height={32} width={32} />
            </button>
          </div>
        )}
        {categoryXState < translateSize && (
          <div className='absolute right-0 w-20 h-14 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200'>
            <button onClick={() => handleButtonClick(1)}>
              <Image src={ICON.rightArrow.default.src} alt={ICON.rightArrow.default.alt} height={32} width={32} />
            </button>
          </div>
        )}
      </div>
      <div>
        <Filter type='price' filterState={filterState} setFilterState={setFilterState} />
      </div>
    </div>
  );
}
/* eslint-enable */
