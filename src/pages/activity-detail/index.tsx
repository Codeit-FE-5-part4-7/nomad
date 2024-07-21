import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getDetailsForActivity, getReviewsForActivity, GetDetailsForActivityResponse, GetReviewsForActivityResponse } from '@/apis/get/getActivityDetail';
import { ICON } from '@/constant/importImages';
import ImageContainer from '@/components/ImageContainer';
import Map from '@/components/Map';
import ReviewList from '@/components/ReviewList';
import FloatingCard from '@/components/FloatingCard';
import TabletCard from '@/components/FloatingCard/TabletSize';
import MobileCard from '@/components/FloatingCard/MobileSize';
import MeatBall from '@/components/Button/MeatBall';
import deleteActivity from '@/apis/delete/deleteActivity';

/* eslint-disable */
// const useAuth = () => {
//   const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
//   return { userId: userId ? parseInt(userId, 10) : null };
// };

export interface ActivityDetailsProps {
  id: number;
}

function ActivityDetail({ id }: ActivityDetailsProps) {
  const router = useRouter();
  // const { userId } = useAuth();

  // console.log('User ID:', userId); // null로 뜸
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 삭제하기 눌렀을때 진짜 삭제하시겠습니까? 모달 뜨게 하기
  const delActivity = async (activityId: number) => {
    try {
      const response = await deleteActivity(activityId);
      if (response) {
        router.push('/');
      } else {
        alert(response);
      }
    } catch (error) {
      console.error('활동 삭제 실패:', error);
      alert('활동 삭제 실패. 나중에 다시 시도해주세요.');
    }
  };

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
    console.error('활동 데이터 로딩 실패:', activityError);
    return <div>활동 데이터 로딩 실패</div>;
  }

  if (reviewsError) {
    console.error('리뷰 데이터 로딩 실패:', reviewsError);
    return <div>리뷰 데이터 로딩 실패</div>;
  }

  if (!activityData || !reviewsData) {
    return <div>데이터가 없습니다</div>;
  }

  // 사용자가 만든 체험인지 확인하는 기능 수정중
  // const isUserActivity = activityData.creatorId === userId;

  return (
    <div className='mt-[7rem] px-[1.6rem] sm:px-[2.4rem] md:px-[3.2rem] lg:px-[18rem]'>
      <div className='flex flex-col gap-[0.25rem]'>
        <p className='text-[1.4rem] text-nomad-black'>{activityData?.category}</p>
        <div className='flex items-center justify-between'>
          <h1 className='text-[3.2rem] text-nomad-black font-bold overflow-hidden whitespace-nowrap text-ellipsis'>{activityData?.title}</h1>
          <div className='flex items-center'>
            {/* {isUserActivity && ( */}
            <div className='flex items-center'>
              <MeatBall editHref={`/my/activities/editactivity/${id}`} handleDelete={() => delActivity(id)} />
            </div>
            {/* )} */}
          </div>
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
