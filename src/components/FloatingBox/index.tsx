import React, { useState } from 'react';
import Image from 'next/image';
import { ICON } from '@/constant';
import CustomCalendar from '../Calendar';
import Button from '../Button';

function FloatingBox() {
  // mockActivityData
  const activityData = {
    id: 7,
    userId: 21,
    title: '함께 배우면 즐거운 스트릿댄스',
    description: '둠칫 둠칫 두둠칫',
    category: '투어',
    price: 12000,
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

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [participants, setParticipants] = useState(1);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleParticipantsChange = (delta: number) => {
    setParticipants((prev) => Math.max(1, prev + delta));
  };

  const totalCost = activityData.price * participants;

  return (
    <div className='w-full max-w-[38.4rem] h-[78rem] bg-white border-[0.2rem] border-gray-50 shadow-lg rounded-[0.8rem] p-[1rem] mx-auto'>
      <div className='px-[2.4rem]'>
        <div className='flex items-center gap-[0.8rem] mb-[1.6rem]'>
          <p className='text-nomad-black text-[2.8rem] font-bold'>₩ {activityData.price}</p>
          <p className='text-[2rem]'> / 인</p>
        </div>
        <div className='border border-solid border-gray-50 mt-[1.6rem]' />
        <p className='my-[1.6rem] font-bold text-nomad-black text-[2rem]'>날짜</p>
        <div className='flex justify-center'>
          <CustomCalendar selectedDate={selectedDate} onChange={handleDateChange} />
        </div>
        <p className='my-[1.6rem] font-bold text-nomad-black text-[1.8rem]'>예약 가능한 시간</p>

        <div className='flex gap-[1.2rem]'>
          <Button text='14:00~15:00' color='black' cssName='w-[11.7rem] h-[4.6rem] text-[1.6rem]' />
          <Button text='15:00~16:00' color='white' cssName='w-[11.7rem] h-[4.6rem] text-[1.6rem]' />
        </div>

        <div className='border border-solid border-gray-100 rounded-[0.6rem] shadow-md mt-[1.6rem]' />
        <p className='my-[1.2rem] font-bold text-nomad-black text-[2rem]'>참여 인원 수</p>
        <div className='flex items-center gap-[0.4rem]'>
          <div className='w-[12rem] h-[4rem] flex items-center mt-[0.8rem] mb-[2.4rem] rounded border border-gray-100 border-solid'>
            <button type='button' onClick={() => handleParticipantsChange(-1)} className='px-[1.6rem] py-[0.8rem]'>
              <Image src={ICON.minusInput.default.src} alt={ICON.minusInput.default.alt} width={40} height={40} />
            </button>
            <input
              type='text'
              value={participants}
              readOnly
              className='w-full h-full p-[0.8rem] outline-none text-center text-[1.4rem] caret-transparent'
            />
            <button type='button' onClick={() => handleParticipantsChange(1)} className='px-[1.6rem] py-[0.8rem]'>
              <Image src={ICON.plusInput.default.src} alt={ICON.plusInput.default.alt} width={40} height={40} />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <Button text='예약하기' color='black' cssName='w-[33.6rem] h-[4.6rem] text-[1.6rem] text-bold' />
        </div>
        <div className='border border-solid border-gray-100 mt-[1.6rem]' />
        <div className='flex justify-between my-[1.8rem]'>
          <p className='text-nomad-black text-[2rem] font-bold'>총 합계</p>
          <p className='text-nomad-black text-[2rem] font-bold'>₩ {totalCost}</p>
        </div>
      </div>
    </div>
  );
}

export default FloatingBox;
