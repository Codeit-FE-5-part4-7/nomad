import postActivity from '@/apis/post/postActivity';
import postActivityImageUrl from '@/apis/post/postActivityImageUrl';
import Button from '@/components/Button';
import ImageCard from '@/components/Card/ImageCard';
import Dropdown from '@/components/Dropdown';
import { DateInput, Input, Textarea } from '@/components/Input';
import ImageInput from '@/components/Input/ImageInput';
import TimeInput from '@/components/Input/TimeInput';
import MyLayout from '@/components/MyLayout';
import ScheduleListItem from '@/components/ScheduleListItem';
import useModal from '@/hooks/useModal';
import { POSTActivitiesReq } from '@/utils/types/myActivities';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FocusEvent, KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

// 문화 예술 | 식음료 | 스포츠 | 투어 | 관광 | 웰빙
type DataName = 'title' | 'category' | 'description' | 'address' | 'price' | 'schedules' | 'bannerImageUrl' | 'subImageUrls';
export default function PostActivitiy() {
  const open = useDaumPostcodePopup();

  const { openModal } = useModal();
  const router = useRouter();

  const [postData, setPostData] = useState<POSTActivitiesReq>({
    title: '',
    category: '',
    description: '',
    address: '',
    price: 0,
    schedules: [],
    bannerImageUrl: '',
    subImageUrls: [],
  });
  const [schedule, setSchedule] = useState<{
    date: string;
    startTime: string;
    endTime: string;
  }>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const bannerImgRef = useRef<HTMLInputElement>(null);
  const subImgRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: -10000, category: '문화 예술', title: '문화 예술' },
    { id: -20000, category: '식음료', title: '식음료' },
    { id: -30000, category: '스포츠', title: '스포츠' },
    { id: -40000, category: '투어', title: '투어' },
    { id: -50000, category: '관광', title: '관광' },
    { id: -60000, category: '웰빙', title: '웰빙' },
  ];

  const DATE_LABEL_STYLE = 'text-[2rem] leading-[2.6rem] text-[#4b4b4b] max-md:text-[1.6rem]';
  const DATE_INPUT_LABEL_STYLE = 'flex flex-col gap-y-[1rem] max-md:gap-y-[0.8rem]';
  const LABEL_STYLE = 'text-[#1b1b1b] text-[2.4rem] font-bold leading-[2.6rem] max-md:text-[2rem]';
  const INPUT_STYLE = 'h-[5.6rem] leading-[2.6rem] py-[0.8rem] px-[1.6rem]';
  const TIME_INPUT_STYLE = 'h-[5.6rem] w-[14rem] max-lg:w-[10.4rem] max-md:w-[7.9rem] max-md:h-[4.4rem] max-md:text-[1.4rem]';

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await postActivity(postData);
    if (!res) return;
    if (res.status === 201) {
      setPostData({
        title: '',
        category: '',
        description: '',
        address: '',
        price: 0,
        schedules: [],
        bannerImageUrl: '',
        subImageUrls: [],
      });
      openModal({
        modalType: 'alert',
        content: '체험 등록이 완료되었습니다',
        btnName: ['확인'],
        callBackFnc: () => {
          router.push('/my/activities');
        },
      });
    } else {
      openModal({
        modalType: 'alert',
        content: res.response.data.message,
        btnName: ['확인'],
      });
    }
  };

  const onBlurSetData = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, dataName: DataName) => {
    const value = dataName === 'price' ? Number(e.target.value) : e.target.value;
    setPostData((prev) => ({ ...prev, [dataName]: value }));
  };

  const numberOnly = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.match(/[^0-9]/g)) {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
    }
  };

  const openAddress = () => {
    open({
      onComplete: (data) => {
        setPostData((prev) => ({ ...prev, address: data.address }));
      },
    });
  };

  const timeToNum = (time: string) => {
    const nextTime = time.replace(':', '');
    return Number(nextTime);
  };

  const addSchedule = () => {
    if (timeToNum(schedule.startTime) >= timeToNum(schedule.endTime)) {
      openModal({
        modalType: 'alert',
        content: '시작 시간이 종료시간보다 늦습니다.',
        btnName: ['확인'],
      });
      return;
    }
    const sameDays = postData.schedules.filter((currunt) => currunt.date === schedule.date);
    const startTimeCheck = sameDays.filter((current) => timeToNum(current.endTime) >= timeToNum(schedule.startTime));
    const endTimeCheck = startTimeCheck.filter((current) => timeToNum(schedule.endTime) >= timeToNum(current.startTime));
    if (endTimeCheck.length >= 1) {
      openModal({
        modalType: 'alert',
        content: '겹치는 예약 시간이 있습니다.',
        btnName: ['확인'],
      });
      return;
    }
    setPostData((prev) => ({ ...prev, schedules: [...prev.schedules, schedule] }));
    setSchedule((prev) => ({
      ...prev,
      startTime: '',
      endTime: '',
    }));
  };

  const delSchedule = (targetSchedule: { date: string; startTime: string; endTime: string }) => {
    const nextSchedules = postData.schedules.filter(
      (prevSchedule) => prevSchedule.date !== targetSchedule.date || prevSchedule.startTime !== targetSchedule.startTime || prevSchedule.endTime !== targetSchedule.endTime,
    );
    setPostData((prev) => ({ ...prev, schedules: nextSchedules }));
  };

  const uploadBannerImage = async () => {
    const formData = new FormData();
    const imgFile = bannerImgRef.current?.files;
    if (imgFile) {
      formData.append('image', imgFile[0]);
    }
    const { data } = await postActivityImageUrl(formData);
    setPostData((prev) => ({ ...prev, bannerImageUrl: data.activityImageUrl }));
    if (bannerImgRef.current) bannerImgRef.current.value = '';
  };

  const delBannerImage = () => {
    setPostData((prev) => ({ ...prev, bannerImageUrl: '' }));
  };

  const uploadSubImage = async () => {
    if (subImgRef.current) {
      const formData = new FormData();
      const imgFile = subImgRef.current?.files;
      if (imgFile) {
        formData.append('image', imgFile[0]);
      }
      const { data } = await postActivityImageUrl(formData);
      const nextSubImages = [data.activityImageUrl, ...postData.subImageUrls].slice(0, 4);
      setPostData((prev) => ({ ...prev, subImageUrls: nextSubImages }));
      subImgRef.current.value = '';
    }
  };

  const delSubImage = (targetImg: string) => {
    const nextSubImages = postData.subImageUrls.filter((imgUrl) => imgUrl !== targetImg);
    setPostData((prev) => ({ ...prev, subImageUrls: nextSubImages }));
  };

  return (
    <MyLayout>
      <main className='bg-[#fafafa] mb-[27rem] max-lg:mb-[40rem] max-md:mb-[13.6rem] text-[1.6rem]'>
        <form onSubmit={() => false}>
          <div className='flex justify-between mb-[2.4rem] '>
            <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem] font-bold'>내 체험 등록</h2>
            <Button type='button' onClick={handleSubmit} color='black' cssName='w-[12rem] h-[4.8rem] text-[1.6rem] leading-[2.6rem] rounded-[0.4rem] border-none' text='등록하기' />
          </div>
          <div className='flex flex-col gap-y-[2.4rem]'>
            {/* ------제목------ */}
            <Input placeholder='제목' type='text' id='title' onBlur={(e) => onBlurSetData(e, 'title')} cssName={INPUT_STYLE} />
            {/* ------카테고리------ */}
            <Dropdown
              lists={categories}
              name='카테고리'
              placeholder='카테고리'
              id='category'
              inputHeight='5.6rem'
              onSelectedId={(id) => {
                const selected = categories.filter((category) => category.id === id);
                setPostData((prev) => ({ ...prev, category: selected[0].category }));
              }}
            />
            {/* ------설명------ */}
            <Textarea placeholder='설명' onBlur={(e) => onBlurSetData(e, 'description')} />
            {/* ------가격------ */}
            <div className='flex flex-col gap-y-[1.6rem]'>
              <label htmlFor='price' className={LABEL_STYLE}>
                가격
              </label>
              <Input placeholder='가격' type='text' id='price' onBlur={(e) => onBlurSetData(e, 'price')} cssName={INPUT_STYLE} onKeyDown={numberOnly} onKeyUp={numberOnly} />
            </div>
            {/* -----주소----- */}
            <div className='flex flex-col gap-y-[1.6rem]'>
              <label htmlFor='address' className={LABEL_STYLE}>
                주소
              </label>
              <Input type='text' placeholder='주소를 입력해주세요' id='address' value={postData.address} ref={addressRef} readOnly onClick={openAddress} cssName={INPUT_STYLE} />
            </div>
            {/* ------예약 가능한 시간대------ */}
            <div className='flex flex-col gap-y-[2.4rem]'>
              <span className={`${LABEL_STYLE} max-md:hidden`}>예약 가능한 시간대</span>
              <div className='flex flex-col gap-y-[2.1rem] max-lg:gap-y-[1.6rem]'>
                <div className='flex pb-[2.1rem] border-b border-[#DDD] max-lg:pb-[1.6rem]'>
                  <div className={`${DATE_INPUT_LABEL_STYLE} mr-[2rem] flex-grow max-lg:mr-[0.5rem] max-md:mr-[0.4rem]`}>
                    <label htmlFor='date' className={DATE_LABEL_STYLE}>
                      날짜
                    </label>
                    <DateInput
                      name='날짜'
                      id='date'
                      value={schedule.date}
                      cssName='h-[5.6rem] px-[1.6rem] max-md:h-[4.4rem]'
                      onPostDataValue={(date) => {
                        setSchedule((prev) => ({ ...prev, date }));
                      }}
                    />
                  </div>
                  <div className={`${DATE_INPUT_LABEL_STYLE} max-lg:mr-[0.5rem] max-md:mr-[0.4rem]`}>
                    <label htmlFor='startTime' className={DATE_LABEL_STYLE}>
                      시작 시간
                    </label>
                    <TimeInput
                      id='startTime'
                      value={schedule.startTime}
                      cssName={TIME_INPUT_STYLE}
                      onChange={(e) => {
                        setSchedule((prev) => ({ ...prev, startTime: e.target.value }));
                      }}
                    />
                  </div>
                  <span className='flex flex-col-reverse text-[2rem] leading-[2.6rem] text-[#1b1b1b] font-bold max-lg:hidden mx-[1.2rem] py-[1.5rem]'>~</span>
                  <div className={`${DATE_INPUT_LABEL_STYLE} mr-[2rem] max-lg:mr-[0.5rem] max-md:mr-[0.4rem]`}>
                    <label htmlFor='endTime' className={DATE_LABEL_STYLE}>
                      종료 시간
                    </label>
                    <TimeInput
                      id='endTime'
                      value={schedule.endTime}
                      cssName={TIME_INPUT_STYLE}
                      onChange={(e) => {
                        setSchedule((prev) => ({ ...prev, endTime: e.target.value }));
                      }}
                    />
                  </div>
                  <div className='flex flex-col-reverse'>
                    <button
                      type='button'
                      className='relative w-[5.6rem] h-[5.6rem] max-md:w-[4.4rem] max-md:h-[4.4rem] disabled:'
                      onClick={addSchedule}
                      disabled={!schedule.date || !schedule.endTime || !schedule.startTime}
                    >
                      <Image src='/icons/Icon_plus_time.svg' fill alt='시간대 추가' />
                    </button>
                  </div>
                </div>
                {postData.schedules.map((scheduleItem) => (
                  <ScheduleListItem schedule={scheduleItem} delSchedule={delSchedule} key={scheduleItem.date + scheduleItem.startTime + scheduleItem.endTime} />
                ))}
              </div>
            </div>
            {/* -----배너 이미지------*/}
            <div>
              <label htmlFor='banner' className={`${LABEL_STYLE}`}>
                배너 이미지
              </label>
              <div className='mt-[2.4rem] flex gap-x-[2.4rem] max-lg:gap-x-[1.6rem] max-md:gap-x-[0.8rem]'>
                <ImageInput id='banner' uploadImage={uploadBannerImage} imgInputRef={bannerImgRef} />
                {postData.bannerImageUrl && <ImageCard image={postData.bannerImageUrl} delCard={delBannerImage} />}
              </div>
            </div>
            {/* -----소개 이미지------*/}
            <div>
              <label htmlFor='introduce' className={`${LABEL_STYLE}`}>
                소개 이미지
              </label>
              <div className='mt-[2.4rem] flex gap-[2.4rem] flex-wrap max-lg:gap-[1.6rem] max-md:gap-[0.8rem]'>
                <ImageInput id='introduce' uploadImage={uploadSubImage} imgInputRef={subImgRef} />
                {!!postData.subImageUrls.length && postData.subImageUrls.map((subImageUrl) => <ImageCard image={subImageUrl} key={subImageUrl} delCard={() => delSubImage(subImageUrl)} />)}
              </div>
            </div>
            <span className='pl-[0.8rem] text-gray-500 text-[1.8rem] leading-[1.6rem]'>*이미지는 최대 4개까지 등록 가능합니다.</span>
          </div>
        </form>
      </main>
    </MyLayout>
  );
}
