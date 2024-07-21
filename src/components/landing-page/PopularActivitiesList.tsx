import { ICON } from '@/constant';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import { GetActivitiesList } from '@/utils/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CardResource from './CardResource';
/* eslint-disable */
interface PopularActivitiesListProps {
  popularActivities: GetActivitiesList[];
}

export default function PopularActivitiesList({ popularActivities }: PopularActivitiesListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const size = useResponsiveSize(10, 12, 0, 0);

  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.style.transition = 'all 0.5s ease-in-out';
    }
  }, []);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.style.transform = `translateX(-${currentIndex * size}%)`;
    }
    if (size === 0) {
      setCurrentIndex(0);
      setHasNext(true);
      setHasPrev(false);
    }
  }, [currentIndex, size]);

  const handleArrowButtonClick = (direction: number) => {
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex <= 7) {
      setCurrentIndex(newIndex);
      setHasPrev(newIndex !== 0);
      setHasNext(newIndex !== 7);
    }
  };

  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-[3.6rem] font-bold text-black'>🔥 인기 체험</h2>
        <div className='flex'>
          <button className='flex items-center justify-center opacity-80 hover:opacity-100 disabled:opacity-40 disabled:cursor-default' onClick={() => handleArrowButtonClick(-1)} disabled={!hasPrev}>
            <Image src={ICON.leftArrow.default.src} alt={ICON.leftArrow.default.alt} height={48} width={48} />
          </button>
          <button
            className='flex items-center justify-center opacity-80 hover:opacity-100 rotate-180 disabled:opacity-40 disabled:cursor-default'
            onClick={() => handleArrowButtonClick(1)}
            disabled={!hasNext}
          >
            <Image src={ICON.leftArrow.default.src} alt={ICON.leftArrow.default.alt} height={48} width={48} />
          </button>
        </div>
      </div>
      <div className='flex items-start justify-start w-full overflow-hidden md:overflow-auto md:scroll-smooth md:webkit-overflow-scrolling-touch md:[&::-webkit-scrollbar]:hidden'>
        <ul className='flex items-start justify-start gap-[2.4rem]' ref={ref}>
          {popularActivities?.map((popularActivity) => (
            <li key={popularActivity.id} className='inline-block whitespace-normal rounded-[2.4rem] overflow-hidden'>
              <CardResource activitiesData={popularActivity} banner />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
/* eslint-enable */
