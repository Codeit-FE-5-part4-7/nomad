import React, { useState } from 'react';
import Image from 'next/image';
import { ICON } from '@/constant';
import CustomCalendar from '../Calendar';
import Button from '../Button';

function FloatingBox() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className='w-[38.4rem] h-[78rem] bg-[#ffffff] border-[0.2rem] border-[#dddddd] shadow-lg rounded-[0.8rem] p-[1rem]'>
      <div className='px-[2.4rem]'>
        <div className='flex items-center gap-[0.8rem] mb-[1.6rem]'>
          <p className='text-[#112211] text-[2.8rem] font-bold'>₩ 1,000</p>
          <p className='text-[2rem]'> / 인</p>
        </div>
        <div className='border border-solid border-[#dddddd] mt-[1.6rem]' />
        <p className='my-[1.6rem] font-bold text-[#112211] text-[2rem]'>날짜</p>
        <div className='flex justify-center'>
          <CustomCalendar selectedDate={selectedDate} onChange={handleDateChange} />
        </div>
        <p className='my-[1.6rem] font-bold text-[#112211] text-[1.8rem]'>예약 가능한 시간</p>

        {/* 예약 가능한 시간 목업 버튼 */}
        <div className='flex gap-[1.2rem]'>
          <Button text='14:00~15:00' color='black' cssName='w-[11.7rem] h-[4.6rem] text-[1.6rem]' />
          <Button text='15:00~16:00' color='white' cssName='w-[11.7rem] h-[4.6rem] text-[1.6rem]' />
        </div>

        {/* 참여 인원 수 목업 버튼 */}
        <div className='border border-solid border-[#CDD0DC] rounded-[0.6rem] shadow-md mt-[1.6rem]' />
        <p className='my-[1.2rem] font-bold text-[#112211] text-[2rem]'>참여 인원 수</p>
        <div className='flex items-center gap-[0.4rem]'>
          <div className='w-[12rem] h-[4rem] flex items-center mt-[0.8rem] mb-[2.4rem] rounded border border-[#CDD0DC] border-solid'>
            <button type='button' className='px-[1.6rem] py-[0.8rem] '>
              <Image src={ICON.minusInput.default.src} alt={ICON.minusInput.default.alt} width={40} height={40} />
            </button>
            <input type='text' value='10' min='1' className='w-full h-full p-[0.8rem] outline-none text-center text-[1.4rem] caret-transparent' />
            <button type='button' className='px-[1.6rem] py-[0.8rem] '>
              <Image src={ICON.plusInput.default.src} alt={ICON.plusInput.default.alt} width={40} height={40} />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <Button text='예약하기' color='black' cssName='w-[33.6rem] h-[4.6rem] text-[1.6rem] text-bold' />
        </div>
        <div className='border border-solid border-[#CDD0DC] mt-[1.6rem]' />
        <div className='flex justify-between my-[1.8rem]'>
          <p className='text-[#112211] text-[2rem] font-bold'>총 합계</p>
          <p className='text-[#112211] text-[2rem] font-bold'>₩ 9,999</p>
        </div>
      </div>
    </div>
  );
}

export default FloatingBox;
