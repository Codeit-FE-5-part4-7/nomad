import React, { useState } from 'react';
import Image from 'next/image';
import { ICON } from '@/constant';
import { Schedule } from '@/types/ActivityDetail';
import useModal from '@/hooks/useModal';
import { format } from 'date-fns';
import Button from '../Button';
import CustomCalendar from '../Calendar';

interface FloatingCardProps {
  schedules: Schedule[];
  price: number;
}

function FloatingCard({ schedules, price }: FloatingCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [participants, setParticipants] = useState(1);
  const { openModal } = useModal();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null); // 날짜 변경되면 초기화
  };

  const handleParticipantsChange = (delta: number) => {
    setParticipants((prev) => Math.max(1, prev + delta));
  };

  const handleTimeChange = (id: number) => {
    setSelectedTime((prev) => (prev === id ? null : id));
  };

  const formattedSelectedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;

  const handleOpenAlertModal = () => {
    openModal({
      modalType: 'alert',
      content: '예약이 완료되었습니다.',
      btnName: ['확인'],
    });
  };

  const isButtonDisabled = selectedTime === null || selectedDate === null;

  // 선택된 날짜의 시간대 목록을 추출하고 시간순으로 정렬
  const filteredTimes: Schedule[] = schedules.filter((schedule) => schedule.date === formattedSelectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const totalCost = price * participants;

  return (
    <div className='w-full max-w-[38.4rem] h-auto bg-white border-[0.2rem] border-gray-50 shadow-lg rounded-[0.8rem] p-[1rem] mx-auto'>
      <div className='px-[2.4rem]'>
        <div className='flex items-center gap-[0.8rem] mb-[1.6rem]'>
          <p className='text-nomad-black text-[2.8rem] font-bold'>₩ {price}</p>
          <p className='text-[2rem]'> / 인</p>
        </div>
        <div className='border border-solid border-gray-50 mt-[1.6rem]' />
        <p className='my-[1.6rem] font-bold text-nomad-black text-[2rem]'>날짜</p>
        <div className='flex justify-center'>
          <CustomCalendar selectedDate={selectedDate} onChange={handleDateChange} />
        </div>
        <p className='my-[1.6rem] font-bold text-nomad-black text-[1.8rem]'>예약 가능한 시간</p>

        <div className='flex flex-wrap gap-[1.2rem]'>
          {filteredTimes.length > 0 ? (
            filteredTimes.map((schedule) => (
              <Button
                key={schedule.id}
                text={`${schedule.startTime}~${schedule.endTime}`}
                color={selectedTime === schedule.id ? 'black' : 'white'}
                cssName='w-[11.7rem] h-[4.6rem] text-[1.6rem]'
                onClick={() => handleTimeChange(schedule.id)}
              />
            ))
          ) : (
            <p className='text-nomad-black text-[1.6rem]'>예약 가능한 시간이 없습니다.</p>
          )}
        </div>

        <div className='border border-solid border-gray-100 rounded-[0.6rem] shadow-md mt-[1.6rem]' />
        <p className='my-[1.2rem] font-bold text-nomad-black text-[2rem]'>참여 인원 수</p>
        <div className='flex items-center gap-[0.4rem]'>
          <div className='w-[12rem] h-[4rem] flex items-center mt-[0.8rem] mb-[2.4rem] rounded border border-gray-100 border-solid'>
            <button type='button' onClick={() => handleParticipantsChange(-1)} className='px-[1.6rem] py-[0.8rem]'>
              <Image src={ICON.minusInput.default.src} alt={ICON.minusInput.default.alt} width={40} height={40} />
            </button>
            <input type='text' value={participants} readOnly className='w-full h-full p-[0.8rem] outline-none text-center text-[1.4rem] caret-transparent' />
            <button type='button' onClick={() => handleParticipantsChange(1)} className='px-[1.6rem] py-[0.8rem]'>
              <Image src={ICON.plusInput.default.src} alt={ICON.plusInput.default.alt} width={40} height={40} />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <Button text='예약하기' color='black' cssName='w-[33.6rem] h-[4.6rem] text-[1.6rem] text-bold' onClick={handleOpenAlertModal} disabled={isButtonDisabled} />
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

export default FloatingCard;
