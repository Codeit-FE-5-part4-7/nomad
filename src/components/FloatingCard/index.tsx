import React from 'react';
import Image from 'next/image';
import { ICON } from '@/constant';
import { Schedule } from '@/utils/types/schedule';
import useReservation from '@/hooks/useReservation';
import useFormatPrice from '@/hooks/useFormatPrice';
import ReservationContent from '../ReservationContent';
import Button from '../Button';

/* eslint-disable */
interface FloatingCardProps {
  schedules: Schedule[];
  price: number;
}

function FloatingCard({ schedules, price }: FloatingCardProps) {
  const formattedPrice = useFormatPrice(price);
  const { selectedDate, selectedTime, participants, handleDateChange, handleParticipantsChange, handleTimeChange, handleReservation, isButtonDisabled, totalCost } = useReservation(schedules, price);

  return (
    <div className='w-full max-w-[38.4rem] h-auto bg-white border-[0.2rem] border-gray-50 shadow-lg rounded-[0.8rem] p-[1rem] mx-auto'>
      <div className='px-[2.4rem]'>
        <div className='flex items-center gap-[0.8rem] mb-[1.6rem]'>
          <p className='text-nomad-black text-[2.8rem] font-bold'>₩ {formattedPrice}</p>
          <p className='text-[2rem]'> / 인</p>
        </div>
        <div className='border border-solid border-gray-50 mt-[1.6rem]' />

        <ReservationContent schedules={schedules} selectedDate={selectedDate} selectedTime={selectedTime} onDateChange={handleDateChange} onTimeChange={handleTimeChange} />

        <div className='border border-solid border-gray-100 rounded-[0.6rem] shadow-md mt-[1.6rem]' />
        <p className='my-[1.2rem] font-bold text-nomad-black text-[2rem]'>참여 인원 수</p>
        <div className='flex items-center gap-[0.4rem]'>
          <div className='w-[12rem] h-[4rem] flex items-center mt-[0.8rem] mb-[2.4rem] rounded border border-gray-100 border-solid'>
            <button type='button' onClick={() => handleParticipantsChange(-1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Decrement participants'>
              <Image src={ICON.minusInput.default.src} alt={ICON.minusInput.default.alt} width={40} height={40} />
            </button>
            <input type='text' value={participants} readOnly className='w-full h-full p-[0.8rem] outline-none text-center text-[1.4rem] caret-transparent' aria-label='Number of participants' />
            <button type='button' onClick={() => handleParticipantsChange(1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Increment participants'>
              <Image src={ICON.plusInput.default.src} alt={ICON.plusInput.default.alt} width={40} height={40} />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <Button text='예약하기' color='black' cssName='w-[33.6rem] h-[4.6rem] text-[1.6rem] text-bold' onClick={handleReservation} disabled={isButtonDisabled} />
        </div>
        <div className='border border-solid border-gray-100 mt-[1.6rem]' />
        <div className='flex justify-between my-[1.8rem]'>
          <p className='text-nomad-black text-[2rem] font-bold'>총 합계</p>
          <p className='text-nomad-black text-[2rem] font-bold'>₩ {useFormatPrice(totalCost)}</p>
        </div>
      </div>
    </div>
  );
}

export default FloatingCard;

/* eslint-enable */
