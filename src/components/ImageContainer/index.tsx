import React from 'react';
import Image from 'next/image';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import DarkModeStore from '@/context/themeContext';
import Slider from '../Slider';

/* eslint-disable */
interface ImageContainerProps {
  mainImageUrl: string;
  gridImages: { id: number; imageUrl: string }[];
}

function ImageContainer({ mainImageUrl, gridImages }: ImageContainerProps) {
  const { isDarkMode } = DarkModeStore((state) => state);

  const defaultImage = isDarkMode ? '/images/logo_big_dark_mode.png' : '/images/logo_big.png';

  const fillGridImages = gridImages && Array.isArray(gridImages) ? [...gridImages] : [];
  const size = useResponsiveSize(8, 9, 4, 4);

  for (let i = fillGridImages.length; i < 4; i += 1) {
    fillGridImages.push({ id: i, imageUrl: defaultImage });
  }

  const images: string[] = [mainImageUrl, ...fillGridImages.map((image) => image.imageUrl)];

  const textColorClass = isDarkMode ? 'text-gray-10' : 'text-black';

  return (
    <div className={`flex max-w-[119rem] h-[53.4rem] gap-[0.8rem] my-[4rem] md:w-full md:h-[31rem] sm:w-full sm:h-[30rem] sm:my-[2.4rem] sm:justify-center ${textColorClass}`}>
      {size === 4 ? (
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-[37.5rem] h-full max-h-[31rem]'>
            <Slider images={images} defaultImage={defaultImage} />
          </div>
        </div>
      ) : (
        <>
          <div className='relative w-1/2 h-full'>
            <Image src={mainImageUrl} alt='mainImage' layout='fill' objectFit='cover' className='object-cover rounded-l-[0.8rem]' />
          </div>
          <div className='relative w-1/2 grid grid-cols-2 grid-rows-2 gap-[0.8rem] rounded-r-[0.8rem] overflow-hidden'>
            {fillGridImages.map((image) => (
              <div key={image.id} className='relative w-full h-full'>
                <Image src={image.imageUrl} alt={`gridImage ${image.id}`} layout='fill' objectFit='cover' />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageContainer;
/* eslint-enable */
