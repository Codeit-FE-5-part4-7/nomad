import React, { useState } from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { ICON } from '@/constant/importImages';
import mockReview from '@/pages/activity-detail/mockReview';

function ReviewList() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = mockReview.slice(startIndex, endIndex);
  const totalPages = Math.ceil(mockReview.length / reviewsPerPage);

  return (
    <>
      <div className='flex flex-col gap-[1.6rem]'>
        <p className='text-nomad-black font-bold text-[2rem]'>후기</p>
        <div className='flex gap-[1.6rem] items-center'>
          <p className='text-[5rem] font-bold'>4.2</p>
          <div className='flex flex-col gap-[0.4rem]'>
            <p className='text-[1.8rem] text-nomad-black'>매우 만족</p>
            <div className='flex items-center gap-[0.6rem]'>
              <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
              <p className='text-black text-[1.4rem]'>1300개 후기</p>
            </div>
          </div>
        </div>
      </div>

      {currentReviews.map((review, index) => (
        <div key={review.id} className={`flex gap-[1.6rem] py-[2.4rem] ${index !== currentReviews.length - 1 ? 'border-b-[0.2rem] border-gray-50 border-solid' : ''}`}>
          <div className='flex-shrink-0'>
            <Image src={review.image} alt='profile_image_test' width={45} height={45} className='rounded-full object-cover border border-gray-50 border-solid w-[4.5rem] h-[4.5rem]' />
          </div>
          <div>
            <div className='flex mb-[0.8rem]'>
              <p className='text-[1.6rem] font-bold max-w-[50rem] overflow-hidden whitespace-nowrap text-ellipsis'>{review.name}</p>
              <p className='mx-[0.8rem] text-[1.4rem]'>|</p>
              <p className='text-[1.6rem] text-gray-300'>{review.date}</p>
            </div>
            <p className='text-[1.6rem] text-nomad-black'>{review.text}</p>
          </div>
        </div>
      ))}

      <div className='mt-[7.2rem] mb-[41rem]'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  );
}

export default ReviewList;
