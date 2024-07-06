import Image from 'next/image';

interface MyActibityCardData {
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

export default function MyActibitiyCardInfo({ title, price, rating, reviewCount }: MyActibityCardData) {
  return (
    <div className='flex flex-col self-center justify-center w-full h-[16.2rem] max-lg:h-[13.1rem] max-sm:h-[10.4rem]'>
      <div className='flex gap-x-[0.6rem]'>
        <div className='relative w-[1.9rem] h-[1.9rem] max-md:w-[1.6rem] max-md:h-[1.6rem]'>
          <Image src='/svgs/star.svg' fill alt='' />
        </div>
        <span className='text-[#1b1b1b] leading-[1.9rem] text-[1.6rem] max-md:text-[1.4rem] max-md:leading-[1.6rem]'>{`${rating} (${reviewCount})`}</span>
      </div>
      <h3 className='mt-[0.6rem] text-[2rem] font-bold leading-[2.6rem] text-[#121] max-lg:text-[1.8rem] max-md:text-[1.4rem] max-md:mt-0'>{title}</h3>
      <div className='flex justify-between mt-[7.2rem] max-lg:mt-[4.8rem] max-md:mt-[2.9rem]'>
        <span className='text-[2.4rem] text-[#1b1b1b] leading-[4rem] font-medium max-lg:text-[2rem] max-md:text-[1.6rem] max-md:leading-[3.2rem]'>₩{price.toLocaleString('ko-KR')}</span>
        <button type='button' className='relative w-[4rem] h-[4rem] max-md:w-[3.2rem] max-md:h-[3.2rem]'>
          <Image src='/svgs/icon_meatball.svg' fill alt='' />
        </button>
      </div>
    </div>
  );
}
