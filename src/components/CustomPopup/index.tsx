import React, { useState } from 'react';
import { Schedule } from '@/types/ActivityDetail';
import { format } from 'date-fns';
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
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]'>
      <div className='bg-white rounded-lg shadow-lg p-4 relative w-full h-full max-w-[48rem] max-h-[60rem] md:w-[48rem] md:h-[60rem]'>
        <button type='button' onClick={handleClose} className='absolute top-4 right-4 text-2xl' aria-label='Close'>
          ✕
        </button>
        <ReservationContent schedules={schedules} selectedDate={currentDate} selectedTime={selectedTime} onDateChange={handleDateChange} onTimeChange={onTimeChange} />
        <div className='flex justify-center mt-4 mb-8'>
          <Button text='예약하기' color='black' cssName='w-full max-w-[43.2rem] h-[5.6rem] text-lg font-bold' onClick={handleClose} disabled={isButtonDisabled} />
        </div>
      </div>
    </div>
  );
}

export default CustomPopup;
