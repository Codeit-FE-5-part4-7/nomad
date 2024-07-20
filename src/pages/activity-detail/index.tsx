import React, { useState, useEffect } from 'react';
import ImageContainer from '@/components/ImageContainer';
import Image from 'next/image';
import FloatingCard from '@/components/FloatingCard';
import TabletCard from '@/components/FloatingCard/TabletSize';
import MobileCard from '@/components/FloatingCard/MobileSize';
import Map from '@/components/Map';
import ReviewList from '@/components/ReviewList';
import { ICON } from '@/constant/importImages';
import mockReview from './mockData/mockReview';
import mockSchedules from './mockData/mockSchedules';
import mockActivityData from './mockData/mockActivityData';
/* eslint-disable */
function ActivityDetail() {
  const activity = mockActivityData;
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width <= 1024 && width > 480);
      setIsMobile(width <= 480);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='mt-[7rem] px-[1.6rem] sm:px-[2.4rem] md:px-[3.2rem] lg:px-[18rem]'>
      <div className='flex flex-col gap-[0.25rem]'>
        <p className='text-[1.4rem] text-nomad-black'>{activity.category}</p>
        <div className='flex items-center justify-between'>
          <h1 className='text-[3.2rem] text-nomad-black font-bold overflow-hidden whitespace-nowrap text-ellipsis'>{activity.title}</h1>
        </div>

        <div className='flex gap-[1.2rem]'>
          <div className='flex gap-[0.6rem]'>
            <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
            <p className='text-[1.4rem] text-black'>{activity.rating}</p>
            <p className='text-[1.4rem] text-black'>({activity.reviewCount})</p>
          </div>

          <div className='flex gap-[0.2rem]'>
            <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[1.4rem] text-nomad-black overflow-hidden whitespace-nowrap text-ellipsis'>{activity.address}</p>
          </div>
        </div>

        <ImageContainer mainImageUrl={activity.bannerImageUrl} gridImages={activity.subImages} />

        <div className='flex flex-col gap-[1.6rem] md:flex-row md:gap-[1.6rem]'>
          <div className='w-full md:w-[70%]'>
            <div className='border-t-[0.2rem] border-gray-50 border-solid' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='text-nomad-black font-bold text-[2rem] pt-[4rem]'>체험 설명</p>
              <p className='text-nomad-black text-[1.6rem]'>{activity.description}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem] sm:my-[2.4rem]' />
            <Map address={activity.address} />

            <div className='flex gap-[0.4rem] mt-[0.8rem]'>
              <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
              <p className='text-nomad-black text-[1.4rem] max-w-[70rem] overflow-hidden whitespace-nowrap text-ellipsis'>{activity.address}</p>
            </div>
            <div />
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <ReviewList reviews={mockReview.reviews} averageRating={mockReview.averageRating} reviewCount={mockReview.totalCount} />
          </div>

          <div className='w-full md:w-[30%] mt-[1.6rem] md:mt-0'>
            {isMobile ? (
              <MobileCard schedules={mockSchedules} price={activity.price} />
            ) : isTablet ? (
              <TabletCard schedules={mockSchedules} price={activity.price} />
            ) : (
              <FloatingCard schedules={mockSchedules} price={activity.price} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;
/* eslint-enable */
