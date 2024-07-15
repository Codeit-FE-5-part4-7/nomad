import Image from 'next/image';
import { Input } from '../Input';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}
export default function ScheduleListItem({ schedule, delSchedule }: { schedule: Schedule; delSchedule: (targetSchedule: Schedule) => void }) {
  const { date, startTime, endTime } = schedule;
  return (
    <div className='flex'>
      <Input type='text' value={date} readOnly />
      <Input type='text' value={startTime} readOnly />
      <span className='flex flex-col justify-center self-center text-[2rem] leading-[2.6rem] text-[#1b1b1b] mx-[1.2rem] font-bold max-lg:hidden '>~</span>
      <Input type='text' value={endTime} readOnly />
      <button type='button' onClick={() => delSchedule(schedule)} className='relative flex-shrink-0 w-[5.6rem] h-[5.6rem] max-md:w-[4.4rem] max-md:h-[4.4rem]'>
        <Image src='/icons/Icon_minus_time.svg' fill alt='시간대 삭제' />
      </button>
    </div>
  );
}
