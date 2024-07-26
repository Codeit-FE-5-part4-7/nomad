import React from 'react';
import { Schedule } from '@/utils/types/schedule';
import { format } from 'date-fns';
import CustomCalendar from '../Calendar';
import Button from '../Button';

interface ReservationContentProps {
  schedules: Schedule[];
  selectedDate: Date | null;
  selectedTime: number | null;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (id: number) => void;
}

function ReservationContent({ schedules, selectedDate, selectedTime, onDateChange, onTimeChange }: ReservationContentProps) {
  const formattedSelectedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;

  const filteredTimes: Schedule[] = schedules.filter((schedule) => schedule.date === formattedSelectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const reservedDates = schedules.map((schedule) => schedule.date);

  return (
    <div>
      <p className='my-[1.6rem] font-bold text-nomad-black text-[2rem]'>날짜</p>
      <div className='flex justify-center'>
        <CustomCalendar selectedDate={selectedDate} onChange={onDateChange} reservedDates={reservedDates} />
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
              onClick={() => onTimeChange(schedule.id)}
            />
          ))
        ) : (
          <p className='text-nomad-black text-[1.6rem]'>예약 가능한 시간이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default ReservationContent;
