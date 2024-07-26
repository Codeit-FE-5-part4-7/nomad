/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/ko';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import BookedBox from '@/components/BookedBox';
import getReservationDashBoard from '@/apis/get/getReservationDashBoard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReservationInfo from '@/components/Modal/ModalContents/reservation-info/ReservationInfo';

dayjs.extend(isoWeek);
dayjs.locale('ko');

type Status = '예약' | '완료' | '승인';
type Reservation = {
  date: string;
  status: Status;
};
type ReservationData = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

interface ActivityType {
  id: number;
  title: string;
  category?: string;
}
interface ActivityDropDownProps {
  items: ActivityType[];
  selectedActivityId: number;
  onStatusChange: () => void;
}

function calendar2({ selectedActivityId }: ActivityDropDownProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const year = currentMonth.format('YYYY');
  const month = currentMonth.format('MM');
  const [isCalendarClick, setIsCalendarClick] = useState(false);
  const [selectedDate, setSeletedDate] = useState<string | null>();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['reservations', selectedActivityId, year, month],
    queryFn: () => {
      if (selectedActivityId) {
        return getReservationDashBoard(selectedActivityId, year, month);
      }
      // selectedActivityId가 없을 경우 기본값 또는 빈 데이터를 반환하거나, 필요에 따라 처리
      return Promise.resolve([]);
    },
    enabled: !!selectedActivityId, // selectedActivityId가 존재할 때만 쿼리 실행
  });

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['reservations', selectedActivityId] });
    }
  }, [data, queryClient, selectedActivityId]);

  // startOf('month') 메서드는 currentMonth를 해당 월의 첫째 날로 설정,
  // startOf('week') 메서드는 그 날이 속한 주의 첫째 날로 설정.
  // 따라서 startDay는 현재 월의 첫째 날이 속한 주의 첫째 날을 가리킴.
  const startDay = currentMonth.startOf('month').startOf('week');
  const endDay = currentMonth.endOf('month').endOf('week');

  const days = [];
  let day = startDay.clone();

  // day가 endDay보다 이전인 동안 반복
  while (day.isBefore(endDay, 'day')) {
    // day 변수의 값을 그대로 사용하면 나중에 값이 변경될 때 문제가 생길 수 있음
    days.push(day.clone());
    day = day.add(1, 'day');
  }

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const getReservationsForDay = (date: string) => {
    if (!data) return [];
    const dayData = data.find((d: ReservationData) => d.date === date);
    if (!dayData) return [];

    const reservations: Reservation[] = [];
    if (dayData.reservations.completed > 0) reservations.push({ date, status: '완료' });
    if (dayData.reservations.confirmed > 0) reservations.push({ date, status: '승인' });
    if (dayData.reservations.pending > 0) reservations.push({ date, status: '예약' });

    return reservations;
  };

  const handleCalendarClick = (day: string) => {
    setIsCalendarClick(!isCalendarClick);
    setSeletedDate(day);
  };

  const handleClose = () => {
    setIsCalendarClick(false);
  };

  return (
    <div className='text-[#000] my-[1.6rem] relative'>
      {isCalendarClick && selectedDate && (
        <div
          className={`fixed top-0 w-full h-full bg-white z-20 transition-transform transform ${
            isCalendarClick ? 'translate-x-0  z-40' : '-translate-x-full'
          } md:absolute md:w-[42.9rem] md:h-[69.7rem] md:bg-white right-0 md:transform-none border border-[#DDDDDD] shadow-[0_0.4rem_1.6rem_0_rgba(17,34,17,0.05)] rounded-[1.2rem] `}
        >
          <ReservationInfo date={selectedDate} activityId={selectedActivityId} onClose={handleClose} />
        </div>
      )}
      <div className='flex flex-row items-center mb-[2.3rem] justify-between'>
        <button className='flex flex-row w-[2.4rem] h-[2.4rem]' type='button' onClick={prevMonth}>
          <ChevronDoubleLeftIcon />
        </button>
        <h2 className='text-[2rem] font-[700]'>{currentMonth.format('YYYY년M월')}</h2>
        <button className='flex flex-row w-[2.4rem] h-[2.4rem]' type='button' onClick={nextMonth}>
          <ChevronDoubleRightIcon />
        </button>
      </div>
      <div className='grid grid-cols-7 '>
        {['일', '월', '화', '수', '목', '금', '토'].map((dayOfweek) => (
          <div key={dayOfweek} className='flex justify-center items-center h-[3rem] font-bold border-[0.1rem] border-[#e8e8e8]'>
            {dayOfweek}
          </div>
        ))}
        {days.map((day) => {
          const reservationsForDay = getReservationsForDay(day.format('YYYY-MM-DD'));
          return (
            <button
              type='button'
              key={day.format('YYYY-MM-DD')}
              className={`flex w-1/7 h-[8.4rem] p-[0.3rem]   border-[#e8e8e8] border flex-col ${day.isSame(currentMonth, 'month') ? '' : 'bg-gray-50'} ${day.isSame(dayjs(), 'day') ? 'border-blue border-[0.2rem]' : ''}  hover:border-blue hover:border-[0.3rem]`}
              onClick={() => handleCalendarClick(day.format('YYYY-MM-DD'))}
            >
              <div className='text-left w-[100%]'>
                <span className=''>{day.date()}</span>
              </div>
              <BookedBox reservations={reservationsForDay} resData={data} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default calendar2;
