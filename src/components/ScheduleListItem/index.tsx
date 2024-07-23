import Image from 'next/image';
import { Input } from '../Input';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}
export default function ScheduleListItem({ schedule, delSchedule }: { schedule: Schedule; delSchedule: (targetSchedule: Schedule) => void }) {
  const { date, startTime, endTime } = schedule;
  const slashDate = date.replaceAll('-', '/');
  const INPUT_STYLE = 'h-[5.6rem] leading-[2.6rem] py-[0.8rem] px-[1.6rem] max-md:h-[4.4rem]';
  const TIME_INPUT_STYLE = 'h-[5.6rem] w-[14rem] max-lg:w-[10.4rem] max-md:w-[7.9rem] max-md:h-[4.4rem] max-md:text-[1.4rem]';

  return (
    <div className='flex gap-x-[2.1rem] max-lg:gap-x-[0.5rem] max-md:gap-x-[0.4rem]'>
      <Input type='text' value={slashDate} readOnly cssName={INPUT_STYLE} />
      <div className='flex max-lg:gap-x-[0.5rem]'>
        <Input type='text' value={startTime} readOnly cssName={`${INPUT_STYLE} ${TIME_INPUT_STYLE}`} />
        <span className='flex flex-col justify-center self-center text-[2rem] leading-[2.6rem] text-[#1b1b1b] mx-[1.2rem] font-bold max-lg:hidden '>~</span>
        <Input type='text' value={endTime} readOnly cssName={`${INPUT_STYLE} ${TIME_INPUT_STYLE}`} />
      </div>
      <button type='button' onClick={() => delSchedule(schedule)} className='relative flex-shrink-0 w-[5.6rem] h-[5.6rem] max-md:w-[4.4rem] max-md:h-[4.4rem]'>
        <Image src='/icons/Icon_minus_time.svg' fill alt='시간대 삭제' />
      </button>
    </div>
  );
}
