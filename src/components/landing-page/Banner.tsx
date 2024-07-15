import { ICON, IMAGE } from '@/constant';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
/* eslint-disable */
export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [bannerList, setBannerList] = useState<{ imageSrc: StaticImageData; title: string; text: string }[]>([]);
  const [isHover, setIsHover] = useState(false);

  const bannerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const bannerImageList: { imageSrc: StaticImageData; title: string; text: string }[] = [
      {
        imageSrc: IMAGE.banner.first.src,
        title: '고민없이 여행을',
        text: '여행을 갈 때 무엇을 할지에 대한 해답을 제공합니다.',
      },
      {
        imageSrc: IMAGE.banner.second.src,
        title: '간편한 체험 예약',
        text: '원하는 여행지의 다양한 체험 상품을 탐색하고, 몇 번의 클릭만으로 예약을 완료할 수 있습니다.',
      },
      {
        imageSrc: IMAGE.banner.third.src,
        title: '체험 상품 등록',
        text: '여행지의 체험을 등록해 체험을 소개하고, 여행자들에게 잊지 못할 추억을 선사해 주세요.',
      },
    ];

    const startData = bannerImageList[0];
    const endData = bannerImageList[2];
    const newList = [endData, ...bannerImageList, startData];

    setBannerList(newList);
  }, []);

  useEffect(() => {
    if (bannerRef.current !== null) {
      bannerRef.current.style.transform = `translateX(-${currentIndex}00%)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHover) {
        const newIndex = currentIndex + 1;

        if (newIndex === 4) {
          moveToNthBanner(1);
        }

        setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);

        if (bannerRef.current !== null) {
          bannerRef.current.style.transition = 'all 0.5s ease-in-out';
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, isHover]);

  const moveToNthBanner = (index: number) => {
    setTimeout(() => {
      setCurrentIndex(index);
      if (bannerRef.current !== null) {
        bannerRef.current.style.transition = '';
      }
    }, 500);
  };

  const handleSwipeClick = (direction: number) => {
    const newIndex = currentIndex + direction;

    if (newIndex === 4) {
      moveToNthBanner(1);
    }

    if (newIndex === 0) {
      moveToNthBanner(3);
    }

    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + direction);

    if (bannerRef.current !== null) {
      bannerRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <div className='relative flex items-center w-full'>
        <div className='relative w-full overflow-hidden'>
          <button
            onClick={() => handleSwipeClick(-1)}
            className='absolute left-4 top-1/2 z-10 hidden transform -translate-y-1/2 rounded-lg opacity-60 hover:opacity-100 focus:outline-none focus:ring sm:block'
          >
            <Image src={ICON.leftArrow.variant1.src} alt='이전 배너' height={47} width={24} />
          </button>
          <button
            onClick={() => handleSwipeClick(1)}
            className='absolute right-4 top-1/2 z-10 hidden transform -translate-y-1/2 rotate-180 rounded-lg opacity-60 hover:opacity-100 focus:outline-none focus:ring sm:block'
          >
            <Image src={ICON.leftArrow.variant1.src} alt='다음 배너' height={47} width={24} />
          </button>
          <ul className='flex transition-transform duration-500 ease-in-out' ref={bannerRef}>
            {bannerList?.map((banner, index) => (
              <li className='relative flex-none w-full h-[55rem] sm:h-[24rem] px-8 overflow-hidden transition-border duration-300' key={`${banner.title}-${index}`}>
                <Image src={banner.imageSrc} alt='배너 이미지' layout='fill' objectFit='cover' priority className='absolute min-w-full min-h-full' />
                <div className='absolute flex flex-col justify-center gap-8 text-white left-[-25%] z-10 w-[50rem] sm:left-8 sm:w-[44rem] sm:gap-4 sm:bottom-8 sm:justify-start sm:items-start md:w-[18.4rem] md:left-6'>
                  <span className='text-[6.8rem] font-bold sm:text-[5.4rem] md:text-[2.4rem]'>{banner.title}</span>
                  <span className='text-[2.4rem] font-bold sm:text-[2rem] md:text-[1.4rem]'>{banner.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='h-[55rem] sm:h-[24rem]' />
    </>
  );
}
/* eslint-enable */
