import throttle from '@/utils/landing-page/throttle';
import { useEffect, useState } from 'react';

type Props = 'popular' | 'all' | 'reservation' | 'management' | 'search' | 'title';
/* eslint-disable */
export default function Skeleton({ type }: { type: Props }) {
  const [allItem, setAllItem] = useState(8);
  const [popularItem, setPopularItem] = useState(3);

  useEffect(() => {
    const handleResize = throttle(() => {
      const breakPoint = window.innerWidth;

      if (breakPoint > 1200) {
        setAllItem(8);
        setPopularItem(3);
      } else if (breakPoint > 768) {
        setAllItem(9);
        setPopularItem(3);
      } else if (breakPoint > 375) {
        setAllItem(4);
        setPopularItem(9);
      }
    }, 100);

    window.addEventListener('resize', handleResize);
    document.body.style.overflowX = 'hidden';

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  switch (type) {
    case 'popular':
      return (
        <div className='grid grid-cols-3 gap-x-6 sm:grid-cols-9'>
          {[...Array(popularItem)].map((_, idx) => (
            <div key={idx} className='relative bg-gray-300 rounded-[2.4rem] w-[38.4rem] h-[38.4rem] sm:w-[18.6rem] sm:h-[18.6rem]'>
              <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-[2.4rem] animate-pulse' />
            </div>
          ))}
        </div>
      );
    case 'all':
      return (
        <div className='grid grid-cols-4 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12'>
          {[...Array(allItem)].map((_, idx) => (
            <div key={idx} className='flex flex-col gap-4'>
              <div className='relative bg-gray-300 rounded-[2.4rem] h-[28.3rem] sm:h-[16rem]'>
                <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-[2.4rem] animate-pulse' />
              </div>
              <div className='h-[2rem] w-[9rem] bg-gray-300 animate-pulse' />
              <div className='h-[2.9rem] bg-gray-300 animate-pulse' />
              <div className='h-[3.3rem] w-[15rem] bg-gray-300 animate-pulse' />
            </div>
          ))}
        </div>
      );
    case 'reservation':
      return (
        <div className='space-y-6'>
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className='flex items-center gap-6 sm:gap-4'>
              <div className='relative bg-gray-300 rounded-[2.4rem] w-[20.4rem] h-[20.4rem] sm:w-[12.8rem] sm:h-[12.8rem]'>
                <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-[2.4rem] animate-pulse' />
              </div>
              <div className='flex flex-col space-y-4 w-full'>
                <div className='h-[2.6rem] w-[6.5rem] bg-gray-300 animate-pulse' />
                <div className='h-[2.6rem] w-[35rem] bg-gray-300 animate-pulse sm:w-full sm:h-[2rem]' />
                <div className='h-[2.6rem] w-[30rem] bg-gray-300 animate-pulse sm:w-full sm:h-[2rem]' />
                <div className='h-[2.9rem] w-[10rem] bg-gray-300 animate-pulse sm:h-[1.9rem]' />
              </div>
            </div>
          ))}
        </div>
      );
    case 'management':
      return (
        <div className='space-y-6'>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className='flex items-center gap-6 sm:gap-4'>
              <div className='relative bg-gray-300 rounded-[2.4rem] w-[20.4rem] h-[20.4rem] sm:w-[12.8rem] sm:h-[12.8rem]'>
                <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-[2.4rem] animate-pulse' />
              </div>
              <div className='flex flex-col space-y-4 w-full'>
                <div className='h-[2.6rem] w-[6.5rem] bg-gray-300 animate-pulse' />
                <div className='h-[2.6rem] w-[35rem] bg-gray-300 animate-pulse sm:w-full sm:h-[2rem]' />
                <div className='h-[2.9rem] w-[30rem] bg-gray-300 animate-pulse sm:w-full sm:h-[1.9rem]' />
              </div>
            </div>
          ))}
        </div>
      );
    case 'search':
      return (
        <div className='relative bg-white rounded-[1.6rem] w-full h-[18rem] shadow-md sm:h-[14.6rem]'>
          <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-[1.6rem] animate-pulse' />
        </div>
      );
    case 'title':
      return (
        <div className='flex justify-between items-center w-full'>
          <span className='text-[3.6rem] font-bold text-black'>🔥 인기 체험</span>
          <span className='h-[4.8rem] w-[10rem] bg-gray-300 animate-pulse' />
        </div>
      );
    default:
      return null;
  }
}
/* eslint-enable */
