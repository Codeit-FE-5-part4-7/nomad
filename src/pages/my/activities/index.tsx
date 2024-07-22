import deleteActivity from '@/apis/delete/deleteActivity';
import getMyActivities from '@/apis/get/getMyActivities';
import AcitivitiesCardList from '@/components/CardList/AcitivitiesCardList';
import MyLayout from '@/components/MyLayout';
import useModal from '@/hooks/useModal';
import { Activity } from '@/utils/types/myActivities';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function MyActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [cursorId, setCursorId] = useState<number | null>();
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const { openModal } = useModal();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const getCardsData = useCallback(async () => {
    const data = await getMyActivities({ size: 6 });
    setIsLoaded(false);
    if (data) {
      setActivities(data.activities);
      setCursorId(data.cursorId);
      setTimeout(() => setIsLoaded(true), 1000);
    }
  }, []);

  const getAddtionalCardsData = useCallback(async () => {
    if (!cursorId) return;
    setIsLoaded(false);
    const data = await getMyActivities({ cursorId, size: 3 });
    if (data) {
      setActivities((prev) => [...prev, ...data.activities]);
      setCursorId(data.cursorId);
    }
    setTimeout(() => setIsLoaded(true), 1000);
  }, [cursorId]);

  const delActivity = async (activitiyId: number) => {
    // 먼저, 모달창을 띄워서 삭제하시겠습니까라는 모달을 띄워야함 모달 완성 이후 작성 예정
    const response = await deleteActivity(activitiyId);
    /* 성공시 response는 falsy값 */
    if (!response) {
      const updatedActivities = activities.filter((activitiy) => activitiy.id !== activitiyId);
      setActivities(() => updatedActivities);
    } else {
      openModal({
        modalType: 'alert',
        content: '체험 삭제에 실패했습니다.',
        btnName: ['확인'],
      });
      // 임시, 실패할 경우 모달을 띄워 알려줄 예정
    }
  };

  useEffect(() => {
    getCardsData();
  }, [getCardsData]);

  useEffect(() => {
    if (inView && isLoaded) {
      getAddtionalCardsData();
    }
  }, [getAddtionalCardsData, inView, isLoaded]);

  return (
    <MyLayout>
      <main className='bg-[#fafafa] mb-[12rem] min-h-[81rem] max-md:min-h-[67rem]'>
        <div className='flex justify-between mb-[2.4rem]'>
          <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem] font-bold'>내 체험 관리</h2>
          <Link href='/my/activities/postactivity' className='flex justify-center items-center w-[12rem] h-[4.8rem] text-[#fff] bg-[#112211] font-bold text-[1.6rem] leading-[2.6rem] rounded-[0.4rem]'>
            체험 등록하기
          </Link>
        </div>
        <AcitivitiesCardList activities={activities} delActivity={delActivity} />
        <div className='overflow-hidden h-0 w-full' aria-hidden ref={ref}>
          감시요소
        </div>
      </main>
    </MyLayout>
  );
}
