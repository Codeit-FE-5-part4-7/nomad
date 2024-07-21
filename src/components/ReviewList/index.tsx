import React, { useState } from 'react';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import Pagination from '@/components/Pagination';
import { Review } from '@/utils/types/reviews';

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
}

function ReviewList({ reviews, averageRating, totalCount }: ReviewListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = sortedReviews.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalCount / reviewsPerPage);

  const getRating = (rating: number): string => {
    if (rating >= 4 && rating <= 5) {
      return '매우 만족';
    }
    if (rating >= 3 && rating < 4) {
      return '만족';
    }
    if (rating >= 2 && rating < 3) {
      return '보통';
    }
    if (rating >= 1 && rating < 2) {
      return '약간 만족';
    }
    return '후기 없음';
  };

  return (
    <>
      <div className='flex flex-col gap-[1.6rem]'>
        <p className='text-nomad-black font-bold text-[2rem]'>후기</p>
        <div className='flex gap-[1.6rem] items-center'>
          <p className='text-[5rem] font-bold'>{averageRating.toFixed(1)}</p>
          <div className='flex flex-col gap-[0.4rem]'>
            <p className='text-[1.8rem] text-nomad-black'>{getRating(averageRating)}</p>
            <div className='flex items-center gap-[0.6rem]'>
              <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
              <p className='text-black text-[1.4rem]'>{totalCount}개 후기</p>
            </div>
          </div>
        </div>
      </div>

      {totalCount === 0 ? (
        <div className='mb-[20rem]'>
          <p className='text-nomad-black text-[1.6rem]'>등록된 후기가 없습니다.</p>
        </div>
      ) : (
        <>
          {currentReviews.map((review, index) => (
            <div key={review.id} className={`flex gap-[1.6rem] py-[2.4rem] ${index !== currentReviews.length - 1 ? 'border-b-[0.2rem] border-gray-50 border-solid' : ''}`}>
              <div className='flex-shrink-0'>
                <Image
                  src={review.user.profileImageUrl}
                  alt={`${review.user.nickname}의 프로필 이미지`}
                  width={45}
                  height={45}
                  className='rounded-full object-cover border border-gray-50 border-solid w-[4.5rem] h-[4.5rem]'
                />
              </div>
              <div>
                <div className='flex mb-[0.8rem]'>
                  <p className='text-[1.6rem] font-bold max-w-[16rem] overflow-hidden whitespace-nowrap text-ellipsis'>{review.user.nickname}</p>
                  <p className='mx-[0.8rem] text-[1.4rem]'>|</p>
                  <p className='text-[1.6rem] text-gray-300'>{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <p className='text-[1.6rem] text-nomad-black'>{review.content}</p>
              </div>
            </div>
          ))}

          <div className='mt-[7.2rem] mb-[41rem]'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      )}
    </>
  );
}

export default ReviewList;
