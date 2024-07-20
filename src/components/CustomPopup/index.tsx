import React, { useState } from 'react';
import Image from 'next/image';
import { Schedule } from '@/types/ActivityDetail';
import { format } from 'date-fns';
import { ICON } from '@/constant';
import Button from '../Button';
import ReservationContent from '../ReservationContent';

interface CustomPopupProps {
  schedules: Schedule[];
  selectedDate: Date | null;
  selectedTime: number | null;
  onClose: () => void;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (id: number) => void;
  setSelectedTimeText: (text: string) => void;
}

function CustomPopup({ schedules, selectedDate, selectedTime, onClose, onDateChange, onTimeChange, setSelectedTimeText }: CustomPopupProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(selectedDate || null);

  const isButtonDisabled = selectedTime === null || currentDate === null;

  const handleDateChange = (date: Date | null) => {
    setCurrentDate(date);
    onDateChange(date);
  };

  const handleClose = () => {
    const formattedDate = currentDate ? format(currentDate, 'yy/MM/dd') : '';
    const selectedSchedule = schedules.find((schedule) => schedule.id === selectedTime);
    const selectedTimeRange = selectedSchedule ? `${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}` : '';
    if (selectedTime !== null && currentDate !== null) {
      setSelectedTimeText(`${formattedDate} ${selectedTimeRange}`);
    }
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[1000]'>
      {/* Background Overlay */}
      <div className='fixed inset-0 bg-transparent bg-opacity-40 z-[-1]' />

      {/* Popup Content */}
      <div className='relative bg-white rounded-lg shadow-lg p-4 max-w-full max-h-full md:max-w-[48rem] md:max-h-[60rem]'>
        <button type='button' onClick={handleClose} className='absolute top-4 right-4 p-2' aria-label='Close'>
          <Image src={ICON.close.default.src} alt={ICON.close.default.alt} width={20} height={20} />
        </button>
        <ReservationContent schedules={schedules} selectedDate={currentDate} selectedTime={selectedTime} onDateChange={handleDateChange} onTimeChange={onTimeChange} />
        <div className='flex justify-center mt-[6.4rem] mb-[3.2rem]'>
          <Button text='예약하기' color='black' cssName='w-full max-w-[43.2rem] h-[5.6rem] text-[1.6rem] font-bold' onClick={handleClose} disabled={isButtonDisabled} />
        </div>
      </div>
    </div>
  );
}

export default CustomPopup;
