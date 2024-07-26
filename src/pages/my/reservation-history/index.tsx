import getMyReservationList from '@/apis/get/getMyReservationList';
import Card from '@/components/Card';
import MyReservationCardInfo from '@/components/Card/myReservationCardInfo';
import FilterDropButton from '@/components/FilterButton/FilterDropButton';
import SideNavigation from '@/components/SideNavigation';
import SideNavigationMobileSize from '@/components/SideNavigation/MobileSize';
import { IReservationCardInfo } from '@/types/ReservationInfo';
import { StatusFilter } from '@/types/StatusFilter';
import setReservationStatueInfo from '@/utils/setReservationStatueInfo';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function ReservationHistory() {
  const [reservationList, setReservationList] = useState<IReservationCardInfo[]>([]);
  const [cursorId, setCursorId] = useState<number | null>();
  const [isLoading, setLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState<StatusFilter | undefined>();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  const handleGetReservationList = useCallback(async (filterOption: string | undefined) => {
    const result = await getMyReservationList({ filterOption });

    if (result) {
      setReservationList(result.reservations);
      setCursorId(result.cursorId);
      setLoading(true);
    }
  }, []);

  const getAddReservationList = useCallback(
    async (filterOption: string | undefined) => {
      if (!cursorId || !isLoading) return;
      const result = await getMyReservationList({ filterOption, cursorId, size: 3 });
      if (result) {
        setReservationList((prev) => [...prev, ...result.reservations]);
        setCursorId(result.cursorId);
      }
    },
    [cursorId, isLoading],
  );

  useEffect(() => {
    handleGetReservationList(currentOption);
  }, [handleGetReservationList, currentOption]);

  useEffect(() => {
    if (inView) {
      getAddReservationList(currentOption);
    }
  }, [inView]);

  return (
    <>
      <section className='pt-[14.2rem] pb-[15rem] px-[2rem] max-w-[124rem] mx-auto flex gap-[2.4rem] items-start'>
        <div className='hidden md:block'>
          <SideNavigation />
        </div>
        <div className='md:hidden '>
          <SideNavigationMobileSize toggleSideNav={toggleSideNav} isSideNavVisible={isSideNavVisible} />
        </div>
        <div className='w-full'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[3.2rem] font-[700] leading-[3.819rem]'>예약 내역</h1>
            <FilterDropButton text={currentOption ? setReservationStatueInfo(currentOption).name : '전체'} setFunc={setCurrentOption} />
          </div>
          <div className='pt-[1.6rem] flex flex-col gap-[2.4rem]'>
            {reservationList &&
              reservationList.map((item) => (
                <Card key={item.id} image={item.activity.bannerImageUrl}>
                  <MyReservationCardInfo data={item} currentFilterOption={currentOption} refreshReservationList={handleGetReservationList} />
                </Card>
              ))}
          </div>
        </div>
      </section>
      {isLoading && <div className='h-0 w-full' aria-hidden ref={ref} />}
    </>
  );
}

export default ReservationHistory;
