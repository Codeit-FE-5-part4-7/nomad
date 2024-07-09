import React from 'react';
import Image from 'next/image';

interface ImageContainerProps {
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
}

function ImageContainer({ bannerImageUrl, subImages }: ImageContainerProps) {
  const defaultImage = '/images/banner_test.png';
  const filledSubImages = [...subImages];

  for (let i = subImages.length; i < 4; i += 1) {
    filledSubImages.push({ id: i, imageUrl: defaultImage });
  }

  return (
    <div className='flex w-[1200px] h-[500px] gap-2 my-10'>
      <div className='relative w-1/2 h-full'>
        <Image src={bannerImageUrl} alt='Banner Image' layout='fill' objectFit='cover' className='object-cover rounded-l-lg' />
      </div>
      <div className='w-1/2 grid grid-cols-2 grid-rows-2 gap-2 rounded-r-lg overflow-hidden'>
        {filledSubImages.map((image) => (
          <div key={image.id} className='relative w-full h-full overflow-hidden'>
            <Image src={image.imageUrl} alt={`SubImage ${image.id}`} layout='fill' objectFit='cover' className='object-cover' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageContainer;
