import Card from '@/components/Card';
import MyReservationCardInfo from '@/components/Card/myReservationCardInfo';
import FilterDropButton from '@/components/FilterButton/FilterDropButton';
import SideNavigation from '@/components/SideNavigation';
import { IReservationCardInfo } from '@/types/ReservationInfo';
import { useState } from 'react';

const mockData: IReservationCardInfo[] = [
  {
    id: 1,
    activity: {
      bannerImageUrl: '/images/test123.png',
      title: 'Mountain Hiking',
      id: 101,
    },
    scheduleId: 1001,
    status: 'confirmed',
    reviewSubmitted: false,
    totalPrice: 150.0,
    headCount: 5,
    date: '2024-08-01',
    startTime: '08:00',
    endTime: '12:00',
    createdAt: '2024-07-01T10:00:00Z',
    updatedAt: '2024-07-02T12:00:00Z',
  },
  {
    id: 2,
    activity: {
      bannerImageUrl: '/images/test123.png',
      title: 'City Tour',
      id: 102,
    },
    scheduleId: 1002,
    status: 'pending',
    reviewSubmitted: false,
    totalPrice: 75.0,
    headCount: 2,
    date: '2024-08-05',
    startTime: '10:00',
    endTime: '14:00',
    createdAt: '2024-07-02T11:00:00Z',
    updatedAt: '2024-07-03T13:00:00Z',
  },
  {
    id: 3,
    activity: {
      bannerImageUrl: '/images/test123.png',
      title: 'Wine Tasting',
      id: 103,
    },
    scheduleId: 1003,
    status: 'declined',
    reviewSubmitted: false,
    totalPrice: 200.0,
    headCount: 4,
    date: '2024-08-10',
    startTime: '16:00',
    endTime: '19:00',
    createdAt: '2024-07-03T09:00:00Z',
    updatedAt: '2024-07-04T15:00:00Z',
  },
  {
    id: 4,
    activity: {
      bannerImageUrl: '/images/test123.png',
      title: 'Cooking Class',
      id: 104,
    },
    scheduleId: 1004,
    status: 'canceled',
    reviewSubmitted: false,
    totalPrice: 120.0,
    headCount: 3,
    date: '2024-08-12',
    startTime: '11:00',
    endTime: '14:00',
    createdAt: '2024-07-04T10:00:00Z',
    updatedAt: '2024-07-05T12:00:00Z',
  },
  {
    id: 5,
    activity: {
      bannerImageUrl: '/images/test123.png',
      title: 'Kayaking',
      id: 105,
    },
    scheduleId: 1005,
    status: 'completed',
    reviewSubmitted: true,
    totalPrice: 180.0,
    headCount: 6,
    date: '2024-07-20',
    startTime: '09:00',
    endTime: '13:00',
    createdAt: '2024-07-05T08:00:00Z',
    updatedAt: '2024-07-20T14:00:00Z',
  },
  {
    id: 6,
    activity: {
      bannerImageUrl: '/images/test123.png',
      title: 'Yoga Retreat',
      id: 106,
    },
    scheduleId: 1006,
    status: 'confirmed',
    reviewSubmitted: false,
    totalPrice: 250.0,
    headCount: 8,
    date: '2024-08-15',
    startTime: '07:00',
    endTime: '10:00',
    createdAt: '2024-07-06T09:00:00Z',
    updatedAt: '2024-07-07T11:00:00Z',
  },
];

function ReservationHistory() {
  const [reservationList] = useState(mockData);

  return (
    <section className='pt-[14.2rem] pb-[15rem] px-[2rem] max-w-[124rem] mx-auto flex gap-[2.4rem] items-start'>
      <SideNavigation />
      <div className='w-full'>
        <div className='flex justify-between items-center'>
          <h1 className='text-[3.2rem] font-[700] leading-[3.819rem]'>예약 내역</h1>
          <FilterDropButton text='필터' />
        </div>
        <div className='pt-[1.6rem] flex flex-col gap-[2.4rem]'>
          {reservationList.map((item) => (
            <Card key={item.activity.title} image={item.activity.bannerImageUrl}>
              <MyReservationCardInfo data={item} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReservationHistory;
