import Button from '@/components/Button';
import ImageCard from '@/components/Card/ImageCard';
import Dropdown from '@/components/Dropdown';
import { DateInput, Input, Textarea } from '@/components/Input';
// import ImageInput from '@/components/Input/ImageInput';
import MyLayout from '@/components/MyLayout';
import ScheduleListItem from '@/components/ScheduleListItem';
import { POSTActivitiesReq } from '@/utils/types/myActivities';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

export default function EditActivitiy() {
  const [postData, setPostData] = useState<POSTActivitiesReq>({
    title: '',
    category: '',
    description: '',
    address: '',
    price: 10000,
    schedules: [
      {
        date: '22/11/11',
        endTime: '13:00',
        startTime: '12:00',
      },
    ],
    bannerImageUrl: '',
    subImageUrls: [],
  });

  const category = [
    { id: -10000, category: '문화 예술' },
    { id: -20000, category: '식음료' },
    { id: -30000, category: '스포츠' },
    { id: -40000, category: '투어' },
    { id: -50000, category: '관광' },
    { id: -60000, category: '웰빙' },
  ];

  const DATE_LABEL_STYLE = 'text-[2rem] leading-[2.6rem] text-[#4b4b4b] max-md:text-[1.6rem]';
  const DATE_INPUT_LABEL_STYLE = 'flex flex-col gap-y-[1rem] max-md:gap-y-[0.8rem]';
  const LABEL_STYLE = 'text-[#1b1b1b] text-[2.4rem] font-bold leading-[2.6rem] max-md:text-[2rem]';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPostData((prev) => ({ ...prev }));
  };

  const delSchedule = () => {
    '스케쥴 삭제하는 버튼';
  };
  return (
    <MyLayout>
      <main className='bg-[#fafafa]'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between mb-[2.4rem] '>
            <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem] font-bold'>내 체험 수정</h2>
            <Button color='black' cssName='w-[12rem] h-[4.8rem] text-[1.6rem] leading-[2.6rem] rounded-[0.4rem] border-none' text='수정하기' />
          </div>
          <div className='flex flex-col gap-y-[2.4rem]'>
            {/* ------제목------ */}
            <Input placeholder='제목' type='text' />
            {/* ------카테고리------ */}
            <Dropdown lists={category} name='카테고리' placeholder='카테고리' onSelectedId={() => {}} />
            {/* ------설명------ */}
            <Textarea placeholder='설명' />
            {/* ------가격------ */}
            <div className='flex flex-col gap-y-[1.6rem]'>
              <label htmlFor='price' className={LABEL_STYLE}>
                가격
              </label>
              <Input placeholder='가격' type='number' id='price' />
            </div>
            {/* -----주소----- */}
            <div className='flex flex-col gap-y-[1.6rem]'>
              <label htmlFor='address' className={LABEL_STYLE}>
                주소
              </label>
              <Input placeholder='주소' type='text' id='address' />
            </div>
            {/* ------예약 가능한 시간대------ */}
            <div className='flex flex-col gap-y-[2.4rem]'>
              <span className={`${LABEL_STYLE} max-md:hidden`}>예약 가능한 시간대</span>
              <div className='flex flex-col gap-y-[2.1rem] max-lg:gap-y-[1.6rem]'>
                <div className='flex pb-[2.1rem] border-b border-[#DDD] max-lg:pb-[1.6rem]'>
                  <div className={`${DATE_INPUT_LABEL_STYLE} mr-[2rem]`}>
                    <label htmlFor='date' className={DATE_LABEL_STYLE}>
                      날짜
                    </label>
                    <DateInput name='날짜' id='date' onPostDataValue={() => {}} />
                  </div>
                  <div className={`${DATE_INPUT_LABEL_STYLE}`}>
                    <label htmlFor='startTime' className={DATE_LABEL_STYLE}>
                      시작 시간
                    </label>
                    <Input type='time' id='startTime' />
                  </div>
                  <span className='flex flex-col-reverse text-[2rem] leading-[2.6rem] text-[#1b1b1b] font-bold max-lg:hidden mx-[1.2rem] py-[1.5rem]'>~</span>
                  <div className={`${DATE_INPUT_LABEL_STYLE} mr-[2rem]`}>
                    <label htmlFor='endTime' className={DATE_LABEL_STYLE}>
                      종료 시간
                    </label>
                    <Input type='time' id='endTime' />
                  </div>
                  <div className='flex flex-col-reverse'>
                    <button type='button' className='relative w-[5.6rem] h-[5.6rem] max-md:w-[4.4rem] max-md:h-[4.4rem]'>
                      <Image src='/icons/Icon_plus_time.svg' fill alt='시간대 추가' />
                    </button>
                  </div>
                </div>
                {postData.schedules.map((schedule) => (
                  <ScheduleListItem schedule={schedule} delSchedule={delSchedule} key={schedule.date + schedule.startTime + schedule.endTime} />
                ))}
              </div>
            </div>
            {/* -----배너 이미지------*/}
            <div>
              <label htmlFor='banner' className={`${LABEL_STYLE}`}>
                배너 이미지
              </label>
              <div className='mt-[2.4rem] flex gap-x-[2.4rem]'>
                {/* <ImageInput id='banner' /> */}
                {postData.bannerImageUrl && (
                  <ImageCard
                    image={postData.bannerImageUrl}
                    delCard={() => {
                      '아이';
                    }}
                  />
                )}
              </div>
            </div>
            {/* -----소개 이미지------*/}
            <div>
              <label htmlFor='introduce' className={`${LABEL_STYLE}`}>
                소개 이미지
              </label>
              <div className='mt-[2.4rem] flex gap-x-[2.4rem] flex-wrap'>
                {/* <ImageInput id='introduce' /> */}
                {!!postData.subImageUrls.length && postData.subImageUrls.map((subImageUrl) => <ImageCard image={subImageUrl} key={subImageUrl} delCard={() => {}} />)}
              </div>
            </div>
          </div>
        </form>
      </main>
    </MyLayout>
  );
}
