import React from 'react';
import ImageContainer from '@/components/ImageContainer';
import Image from 'next/image';
import ReservationCard from '@/components/FloatingCard';
import Map from '@/components/Map';
import ReviewList from '@/components/ReviewList';
import { ICON } from '@/constant/importImages';
import mockReview from './mockData/mockReview';
import mockSchedules from './mockData/mockSchedules';
import mockActivityData from './mockData/mockActivityData';
// import Router from 'next/router';
// import getActivity from '@/apis/get/getActivity';
// import getReviews from '@/apis/get/getReviews';
// import { getAbledResrvationList } from '@/apis/get/getAvailableReservations';
// router로 id 가져오기

function ActivityDetailPage() {
  // const activity = activityData;
  const activity = mockActivityData;

  return (
    <div className='mt-[7rem] px-[18rem]'>
      <div className='flex flex-col gap-[0.25rem]'>
        <p className='text-[1.4rem] text-nomad-black'>{activity.category}</p>
        <div>
          <h1 className='text-[3.2rem] text-nomad-black font-bold'>{activity.title}</h1>
        </div>

        <div className='flex gap-[1.2rem]'>
          <div className='flex gap-[0.6rem]'>
            <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
            <p className='text-[1.4rem] text-black'>{activity.rating}</p>
            <p className='text-[1.4rem] text-black'>({activity.reviewCount})</p>
          </div>

          <div className='flex gap-[0.2rem]'>
            <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[1.4rem] text-nomad-black'>{activity.address}</p>
          </div>
        </div>

        <ImageContainer mainImageUrl={activity.bannerImageUrl} gridImages={activity.subImages} />

        <div className='flex gap-[1.6rem]'>
          <div className='w-[79rem] mb-[8rem] relative'>
            <div className='border-t-[0.2rem] border-gray-50 border-solid' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='text-nomad-black font-bold text-[2rem] pt-[4rem]'>체험 설명</p>
              <p className='text-nomad-black text-[1.6rem]'>{activity.description}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <div className='border-gray-300 border-radius-[0.8rem] relative z-100'>
              <Map address={activity.address} />
            </div>
            <div className='flex gap-[0.4rem] mt-[0.8rem]'>
              <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
              <p className='text-nomad-black text-[1.4rem] max-w-[70rem] overflow-hidden whitespace-nowrap text-ellipsis'>{activity.address}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <ReviewList reviews={mockReview.reviews} averageRating={mockReview.averageRating} reviewCount={mockReview.totalCount} />
          </div>
          <div className='ml-[1.4rem]'>
            <ReservationCard schedules={mockSchedules} price={activity.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailPage;
