import React from 'react';
import ImageContainer from '@/components/ImageContainer';
import Image from 'next/image';
import FloatingBox from '@/components/FloatingBox';
import Map from '@/components/Map';
import ReviewList from '@/components/ReviewList';
import { ICON } from '@/constant/importImages';
// import Router from 'next/router';
// import getActivity from '@/apis/get/getActivity';
// import getReviews from '@/apis/get/getReviews';
// import { getAbledResrvationList } from '@/apis/get/getAvailableReservations';
import mockReview from './mockReview';

// router로 id 가져오기
function ActivityDetail() {
  const activityData = {
    id: 7,
    userId: 21,
    title: '함께 배우면 즐거운 스트릿댄스',
    description: '둠칫 둠칫 두둠칫',
    category: '투어',
    price: 10000,
    address: '서울특별시 강남구 테헤란로 427',
    bannerImageUrl: '/images/banner_main.png',
    subImageUrls: [
      {
        id: 1,
        imageUrl: '/images/test_kitty.png',
      },
      {
        id: 2,
        imageUrl: '/images/test_kitty2.png',
      },
      {
        id: 3,
        imageUrl: '/images/test_kitty3.png',
      },
    ],
    schedules: [
      {
        id: 1,
        date: '2023-12-01',
        startTime: '12:00',
        endTime: '13:00',
      },
      {
        id: 2,
        date: '2023-12-05',
        startTime: '12:00',
        endTime: '13:00',
      },
    ],
    reviewCount: 5,
    rating: 4.74,
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  };

  return (
    <div className='mt-[7rem] px-[18rem]'>
      <div className='flex flex-col gap-[0.25rem]'>
        <p className='text-[1.4rem] text-nomad-black'>{activityData.category}</p>
        <div>
          <h1 className='text-[3.2rem] text-nomad-black font-bold'>{activityData.title}</h1>
        </div>

        <div className='flex gap-[1.2rem]'>
          <div className='flex gap-[0.6rem]'>
            <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
            <p className='text-[1.4rem] text-black'>{activityData.rating}</p>
            <p className='text-[1.4rem] text-black'>({activityData.reviewCount})</p>
          </div>

          <div className='flex gap-[0.2rem]'>
            <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[1.4rem] text-nomad-black'>{activityData.address}</p>
          </div>
        </div>

        <ImageContainer mainImageUrl={activityData.bannerImageUrl} gridImages={activityData.subImageUrls} />

        <div className='flex gap-[1.6rem]'>
          <div className='w-[79rem] mb-[8rem]'>
            <div className='border-t-[0.2rem] border-gray-50 border-solid' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='text-nomad-black font-bold text-[2rem] pt-[4rem]'>체험 설명</p>
              <p className='text-nomad-black text-[1.6rem]'>{activityData.description}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <Map address={activityData.address} />
            <div className='flex gap-[0.4rem] mt-[0.8rem]'>
              <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
              <p className='text-nomad-black text-[1.4rem] max-w-[70rem] overflow-hidden whitespace-nowrap text-ellipsis'>{activityData.address}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <ReviewList reviews={mockReview.reviews} averageRating={mockReview.averageRating} reviewCount={mockReview.totalCount} />
          </div>
          <div className='ml-[1.4rem]'>
            <FloatingBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;
