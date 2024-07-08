import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ActibityCardData {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  address?: string;
  bannerImageUrl?: string;
  rating: number;
  reviewCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function MyActibitiyCardInfo({ data }: { data: ActibityCardData }) {
  const [isDropShow, setIsDropShow] = useState<boolean>(false);

  const { title, price, rating, reviewCount } = data;

  const closeDrop = () => {
    setIsDropShow(false);
  };

  useEffect(() => {
    document.body.addEventListener('click', closeDrop);
  }, []);

  return (
    <div className='relative flex flex-col self-center justify-center w-full h-[16.2rem] max-lg:h-[13.1rem] max-sm:h-[10.4rem]'>
      <div className='flex gap-x-[0.6rem]'>
        <div className='relative w-[1.9rem] h-[1.9rem] max-md:w-[1.6rem] max-md:h-[1.6rem]'>
          <Image src='/svgs/star.svg' fill alt='' />
        </div>
        <span className='text-[#1b1b1b] leading-[1.9rem] text-[1.6rem] max-md:text-[1.4rem] max-md:leading-[1.6rem]'>{`${rating} (${reviewCount})`}</span>
      </div>
      <h3 className='mt-[0.6rem] text-[2rem] font-bold leading-[2.6rem] text-[#121] max-lg:text-[1.8rem] max-md:text-[1.4rem] max-md:mt-0'>{title}</h3>
      <div className='flex justify-between mt-[7.2rem] max-lg:mt-[4.8rem] max-md:mt-[2.9rem]'>
        <span className='text-[2.4rem] text-[#1b1b1b] leading-[4rem] font-medium max-lg:text-[2rem] max-md:text-[1.6rem] max-md:leading-[3.2rem]'>₩{price.toLocaleString('ko-KR')}</span>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            setIsDropShow(!isDropShow);
          }}
          className='relative w-[4rem] h-[4rem] max-md:w-[3.2rem] max-md:h-[3.2rem]'
        >
          <Image src='/svgs/icon_meatball.svg' fill alt='' />
        </button>
      </div>
      {isDropShow && (
        <div className='absolute bottom-[-12.7rem] right-0 flex flex-col rounded-md border-[#DDD] border max-lg:bottom-[-11.7rem] max-md:bottom-[-9.3rem]'>
          <button
            type='button'
            className='flex justify-center items-center px-[4.6rem] py-[1.8rem] text-[1.8rem] text-[#4B4B4B] leading-[2.2rem] font-medium border-[#DDD] border-b max-lg:text-[1.6rem] max-lg:px-[3.4rem] max-lg:py-[1.4rem] max-md:text-[1.2rem] max-md:px-[2.8rem] max-md:py-[1rem]'
          >
            수정하기
          </button>
          <button
            type='button'
            className='flex justify-center items-center text-[1.8rem] text-[#4B4B4B] font-medium px-[4.6rem] leading-[2.2rem] py-[1.8rem] max-lg:text-[1.6rem] max-lg:px-[3.4rem] max-lg:py-[1.4rem] max-md:text-[1.2rem] max-md:px-[2.8rem] max-md:py-[1rem]'
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
