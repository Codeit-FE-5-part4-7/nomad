import React from 'react';
import Image from 'next/image';
// 모바일 일때 슬라이더로 전환
// 이미지 클릭 시 크게 보이게

interface ImageContainerProps {
  mainImageUrl: string;
  gridImages: { id: number; imageUrl: string }[];
}

function ImageContainer({ mainImageUrl, gridImages }: ImageContainerProps) {
  const defaultImage = '/images/logo_big.png';
  const fillGridImages = gridImages && Array.isArray(gridImages) ? [...gridImages] : [];

  for (let i = fillGridImages.length; i < 4; i += 1) {
    fillGridImages.push({ id: i, imageUrl: defaultImage });
  }

  return (
    <div className='flex max-w-[119rem] h-[53.4rem] md:w-full md:h-[31rem] sm:w-full sm:h-[30rem] gap-[0.8rem] mt-[4rem] mb-[8rem]'>
      <div className='relative w-1/2 h-full'>
        <Image src={mainImageUrl} alt='mainImage' fill style={{ objectFit: 'cover' }} className='rounded-l-[0.8rem]' />
      </div>
      <div className='w-1/2 grid grid-cols-2 grid-rows-2 gap-[0.8em] rounded-r-[0.8rem] overflow-hidden'>
        {fillGridImages.map((image) => (
          <div key={image.id} className='relative w-full h-full overflow-hidden'>
            <Image src={image.imageUrl} alt={`gridImage ${image.id}`} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageContainer;
