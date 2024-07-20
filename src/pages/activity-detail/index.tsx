import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getDetailsForActivity, getReviewsForActivity, GetDetailsForActivityResponse, GetReviewsForActivityResponse } from '@/apis/get/getActivityDetail';
import ImageContainer from '@/components/ImageContainer';
import Image from 'next/image';
import Map from '@/components/Map';
import ReviewList from '@/components/ReviewList';
import FloatingCard from '@/components/FloatingCard';
import TabletCard from '@/components/FloatingCard/TabletSize';
import MobileCard from '@/components/FloatingCard/MobileSize';
import { ICON } from '@/constant/importImages';
/* eslint-disable */

export interface ActivityDetailsProps {
  id: number;
}

function ActivityDetail({ id }: ActivityDetailsProps) {
  const router = useRouter();

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

  const {
    data: activityData,
    error: activityError,
    isLoading: isLoadingActivity,
  } = useQuery<GetDetailsForActivityResponse>({
    queryKey: ['activityDetails', id],
    queryFn: () => getDetailsForActivity({ id }),
  });

  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: isLoadingReviews,
  } = useQuery<GetReviewsForActivityResponse>({
    queryKey: ['activityReviews', id],
    queryFn: () =>
      getReviewsForActivity({
        id,
        page: 1,
        size: 3,
      }),
  });

  if (isLoadingActivity || isLoadingReviews) {
    return <div>Loading...</div>;
  }

  if (activityError) {
    console.error('Error fetching activity data:', activityError);
    return <div>Error fetching activity data</div>;
  }

  if (reviewsError) {
    console.error('Error fetching reviews data:', reviewsError);
    return <div>Error fetching reviews data</div>;
  }

  if (!activityData || !reviewsData) {
    return <div>No data available</div>;
  }

  return (
    <div className='mt-[7rem] px-[1.6rem] sm:px-[2.4rem] md:px-[3.2rem] lg:px-[18rem]'>
      <div className='flex flex-col gap-[0.25rem]'>
        <p className='text-[1.4rem] text-nomad-black'>{activityData?.category}</p>
        <div className='flex items-center justify-between'>
          <h1 className='text-[3.2rem] text-nomad-black font-bold overflow-hidden whitespace-nowrap text-ellipsis'>{activityData?.title}</h1>
        </div>

        <div className='flex gap-[1.2rem]'>
          <div className='flex gap-[0.6rem]'>
            <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
            <p className='text-[1.4rem] text-black'>{activityData?.rating}</p>
            <p className='text-[1.4rem] text-black'>({activityData?.reviewCount})</p>
          </div>

          <div className='flex gap-[0.2rem]'>
            <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[1.4rem] text-nomad-black overflow-hidden whitespace-nowrap text-ellipsis'>{activityData?.address}</p>
          </div>
        </div>

        <ImageContainer mainImageUrl={activityData?.bannerImageUrl} gridImages={activityData?.subImages} />

        <div className='flex flex-col gap-[1.6rem] md:flex-row md:gap-[1.6rem]'>
          <div className='w-full md:w-[70%]'>
            <div className='border-t-[0.2rem] border-gray-50 border-solid' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='text-nomad-black font-bold text-[2rem] pt-[4rem]'>체험 설명</p>
              <p className='text-nomad-black text-[1.6rem]'>{activityData?.description}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem] sm:my-[2.4rem]' />
            <Map address={activityData?.address} />

            <div className='flex gap-[0.4rem] mt-[0.8rem]'>
              <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
              <p className='text-nomad-black text-[1.4rem] max-w-[70rem] overflow-hidden whitespace-nowrap text-ellipsis'>{activityData?.address}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <ReviewList reviews={reviewsData?.reviews} averageRating={reviewsData?.averageRating} totalCount={reviewsData?.totalCount} />
          </div>

          <div className='w-full md:w-[30%] mt-[1.6rem] md:mt-0'>
            {isMobile ? (
              <MobileCard schedules={activityData?.schedules} price={activityData?.price} />
            ) : isTablet ? (
              <TabletCard schedules={activityData?.schedules} price={activityData?.price} />
            ) : (
              <FloatingCard schedules={activityData?.schedules} price={activityData?.price} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;

/* eslint-enable */
