import Image from 'next/image';
import { ICON } from '@/constant';
import { GetActivitiesList } from '@/utils/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
/* eslint-disable */
interface CardResourceProps {
  activitiesData: GetActivitiesList;
  banner: boolean;
}

export default function CardResource({ activitiesData, banner }: CardResourceProps) {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/activity-detail/${id}`);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (banner) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (banner) {
      setIsHovered(false);
    }
  };

  return (
    <div
      onClick={() => handleClick(activitiesData.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col gap-4 cursor-pointer bg-gradient-to-b 
		to-[#000000cc] transition-transform duration-300
		${banner ? 'relative md:w-[38.4rem] md:h-[38.4rem] w-[18.6rem] h-[18.6rem] from-transparent rounded-[2.4rem] flex-col-reverse' : ''}`}
    >
      <div
        className={`${
          banner
            ? 'absolute inset-0 z-[-1] md:w-[38.4rem] md:h-[38.4rem] w-[18.6rem] h-[18.6rem]'
            : 'relative lg:w-[28.3rem] lg:h-[28.3rem] md:w-[22.1rem] md:h-[22.1rem] w-[16.8rem] h-[16.8rem] rounded-[1.6rem]'
        } 
	   overflow-hidden md:w-full md:pt-full`}
      >
        <Image
          src={activitiesData.bannerImageUrl}
          width={384}
          height={384}
          alt='배너 이미지'
          className={`${isHovered ? 'scale-125' : ''} 
		  hover:scale-125 object-cover transition-transform duration-300 md:absolute md:top-0 md:left-0 md:w-full md:h-full`}
        />
      </div>
      <div className={`${banner ? 'absolute bottom-0 left-0 text-white md:h-[21.4rem] h-[15.7rem]' : 'text-black md:h-[10.7rem] h-[9rem]'} flex flex-col gap-4  w-full`}>
        <div className='flex items-center text-lg font-medium'>
          <Image src={ICON.star.active.src} width={20} height={20} alt={ICON.star.active.alt} className='mr-2' />
          {activitiesData.rating}
          &nbsp;
          <span className='text-[#a1a1a1]'>({activitiesData.reviewCount})</span>
        </div>
        <div
          className={`${banner ? 'md:w-[23rem] md:h-[7.2rem] w-[14.6rem] h-[7.2rem] md:leading-[3.6rem] ledading-[2.15rem] md:text-[3rem] text-[1.8rem]'
			 : 'md:text-[2.4rem] md:leading-[2.86rem] text-[1.8rem] leading-[2.15rem]'} 
		font-semibold line-clamp-1`}
        >
          {activitiesData.title}
        </div>
        <div
          className={` ${banner ? 'md:leading-[2.4rem] md:text-[2rem] leading-[1.9rem] text-[1.6rem] md:h-[2.4rem] h-[1.9rem]' 
			: 'md:leading-[3.34rem] md:text-[2.8rem] leading-[2.4rem] text-[2rem] md:h-[3.3rem] h-[2.4rem]'} 
			flex items-center font-bold gap-2 `}
        >
          {activitiesData.price === 0 ? (
            '무료체험'
          ) : (
            <>
              ￦ {activitiesData.price.toLocaleString()} 
			  <span className={`${banner ? 'text-[1.4rem] leading-[1.67rem]' : 'md:leading-[2.4rem] md:text-[2rem] text-[1.6rem] leading-[1.9rem]'} 
			  font-normal text-[#a4a1aa]`}>/ 인</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
/* eslint-enable */
