import React from 'react';
import Image from 'next/image';

// 추후에 레이아웃 변경
interface ImageContainerProps {
  mainImageUrl: string;
  gridImages: { id: number; imageUrl: string }[];
}

function ImageContainer({ mainImageUrl, gridImages }: ImageContainerProps) {
  const defaultImage = '/images/logo_big.png'; // default image 임의 등록
  const fillGridImages = gridImages && Array.isArray(gridImages) ? [...gridImages] : [];

  for (let i = fillGridImages.length; i < 4; i += 1) {
    fillGridImages.push({ id: i, imageUrl: defaultImage });
  }

  return (
    <div className='flex w-[120rem] h-[50rem] gap-[0.8rem] mt-[4rem] mb-[8rem]'>
      <div className='relative w-1/2 h-full'>
        <Image src={mainImageUrl} alt='mainImage' layout='fill' objectFit='cover' className='object-cover rounded-l-[0.8rem]' />
      </div>
      <div className='w-1/2 grid grid-cols-2 grid-rows-2 gap-[0.8em] rounded-r-[0.8rem] overflow-hidden'>
        {fillGridImages.map((image) => (
          <div key={image.id} className='relative w-full h-full overflow-hidden'>
            <Image src={image.imageUrl} alt={`gridImage ${image.id}`} layout='fill' objectFit='cover' className='object-cover' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageContainer;
