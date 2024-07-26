import getActivity from '@/apis/get/getActivity';
import patchActivity from '@/apis/patch/patchActivity';
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
import { GetActivityDetail } from '@/utils/types';
import { PATCHActivityReq } from '@/utils/types/myActivities';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

// 문화 예술 | 식음료 | 스포츠 | 투어 | 관광 | 웰빙
type DataName = 'title' | 'category' | 'description' | 'address' | 'price' | 'schedules' | 'bannerImageUrl' | 'subImageUrls';
export default function PostActivitiy() {
  const open = useDaumPostcodePopup();
  const router = useRouter();
  const { id } = router.query;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { openModal } = useModal();

  const [schedule, setSchedule] = useState<{
    date: string;
    startTime: string;
    endTime: string;
  }>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const [initData, setInitData] = useState<GetActivityDetail>({
    address: '',
    bannerImageUrl: '',
    category: '',
    createdAt: '',
    description: '',
    id: 0,
    price: 0,
    rating: 0,
    reviewCount: 0,
    schedules: [],
    subImages: [],
    title: '',
    updatedAt: '',
    userId: 0,
  });
  const [patchData, setPatchData] = useState<PATCHActivityReq>({
    title: '',
    category: '',
    description: '',
    address: '',
    price: 0,
    schedulesToAdd: [],
    scheduleIdsToRemove: [],
    bannerImageUrl: '',
    subImageUrlsToAdd: [],
    subImageIdsToRemove: [],
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
  const DATE_LABEL_STYLE = 'text-[2rem] leading-[2.6rem] text-gray-500 dark:text-gray-50 max-md:text-[1.6rem]';
  const DATE_INPUT_LABEL_STYLE = 'flex flex-col gap-y-[1rem] max-md:gap-y-[0.8rem]';
  const LABEL_STYLE = 'text-black dark:text-white text-[2.4rem] font-bold leading-[2.6rem] max-md:text-[2rem]';
  const INPUT_STYLE = 'h-[5.6rem] leading-[2.6rem] py-[0.8rem] px-[1.6rem]';
  const TIME_INPUT_STYLE = 'h-[5.6rem] w-[14rem] max-lg:w-[10.4rem] max-md:w-[7.9rem] max-md:h-[4.4rem] max-md:text-[1.4rem]';

  const selectedCategory = categories.filter((item) => item.category === initData.category);

  const getInitData = useCallback(async () => {
    if (!id || typeof id === 'object') return;
    const res = await getActivity(id);
    const { title, address, bannerImageUrl, category, description, price } = res;
    setInitData(() => res);
    setPatchData((prev) => ({ ...prev, title, address, bannerImageUrl, category, description, price }));
    setIsLoaded(true);
  }, [id]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await patchActivity(id, patchData);
    if (!res) return;
    if (res.status === 200) {
      openModal({
        modalType: 'alert',
        content: '수정이 완료되었습니다',
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

  const onChangeSetData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, dataName: DataName, maxLength: number) => {
    const slicedValue = e.target.value.slice(0, maxLength);
    const value = dataName === 'price' ? Number(slicedValue) : slicedValue;
    setPatchData((prev) => ({ ...prev, [dataName]: value }));
  };

  const numberOnly = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.match(/[^0-9]/g)) {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
    }
  };

  const openAddress = () => {
    open({
      onComplete: (data) => {
        setPatchData((prev) => ({ ...prev, address: data.address }));
      },
    });
  };

  const timeToNum = (time: string) => {
    const nextTime = time.replace(':', '');
    return Number(nextTime);
  };

  const AddSchedule = () => {
    if (timeToNum(schedule.startTime) >= timeToNum(schedule.endTime)) {
      openModal({
        modalType: 'alert',
        content: '시작 시간이 종료시간보다 늦습니다.',
        btnName: ['확인'],
      });
      return;
    }
    const sameDays = initData.schedules.filter((currunt) => currunt.date === schedule.date);
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
    const scheduleForInit = { ...schedule, id: -1 };
    setInitData((prev) => ({ ...prev, schedules: [...prev.schedules, scheduleForInit] }));
    setPatchData((prev) => ({ ...prev, schedulesToAdd: [...prev.schedulesToAdd, schedule] }));
    setSchedule((prev) => ({
      ...prev,
      startTime: '',
      endTime: '',
    }));
  };

  const delSchedule = (scheduleObj: { id: number; date: string; startTime: string; endTime: string }) => {
    const nextSchedules = initData.schedules.filter((scheduleItem) => scheduleItem.date !== scheduleObj.date || scheduleItem.startTime !== scheduleObj.startTime);
    const nextScheduleToAdd = patchData.schedulesToAdd.filter((scheduleItem) => scheduleItem.date !== scheduleObj.date || scheduleItem.startTime !== scheduleObj.startTime);
    setInitData((prev) => ({ ...prev, schedules: nextSchedules }));
    setPatchData((prev) => ({ ...prev, schedulesToAdd: nextScheduleToAdd }));
    if (scheduleObj.id !== -1) setPatchData((prev) => ({ ...prev, scheduleIdsToRemove: [...prev.scheduleIdsToRemove, scheduleObj.id] }));
  };

  const uploadBannerImage = async () => {
    const formData = new FormData();
    const imgFile = bannerImgRef.current?.files;
    if (imgFile) {
      formData.append('image', imgFile[0]);
    }
    const { data } = await postActivityImageUrl(formData);
    setPatchData((prev) => ({ ...prev, bannerImageUrl: data.activityImageUrl }));
    setInitData((prev) => ({ ...prev, bannerImageUrl: data.activityImageUrl }));
    if (bannerImgRef.current) bannerImgRef.current.value = '';
  };

  const delBannerImage = () => {
    setPatchData((prev) => ({ ...prev, bannerImageUrl: '' }));
    setInitData((prev) => ({ ...prev, bannerImageUrl: '' }));
  };

  const uploadSubImage = async () => {
    if (subImgRef.current) {
      const formData = new FormData();
      const imgFile = subImgRef.current?.files;
      if (imgFile) {
        formData.append('image', imgFile[0]);
      }
      const { data } = await postActivityImageUrl(formData);
      const nextSubImagesToAdd = [data.activityImageUrl, ...patchData.subImageUrlsToAdd];
      const nextSubImages = [{ imageUrl: data.activityImageUrl, id: 0 }, ...initData.subImages].slice(0, 4);
      setInitData((prev) => ({ ...prev, subImages: nextSubImages }));
      setPatchData((prev) => ({ ...prev, subImageUrlsToAdd: nextSubImagesToAdd }));
      subImgRef.current.value = '';
    }
  };

  const delSubImage = (tagetImgUrl: string) => {
    const nextSubImages = initData.subImages.filter((imgUrl) => imgUrl.imageUrl !== tagetImgUrl);
    const imgToRemove = initData.subImages.filter((imgUrl) => imgUrl.imageUrl === tagetImgUrl);
    const nextSubImagesToRemove = [...patchData.subImageIdsToRemove, imgToRemove[0].id];
    const nextSubImageUrlToAdd = patchData.subImageUrlsToAdd.filter((toAdd) => toAdd !== tagetImgUrl);
    setInitData((prev) => ({ ...prev, subImages: nextSubImages }));
    setPatchData((prev) => ({ ...prev, subImageIdsToRemove: nextSubImagesToRemove, subImageUrlsToAdd: nextSubImageUrlToAdd }));
  };

  useEffect(() => {
    getInitData();
  }, [getInitData]);

  return (
    <MyLayout>
      <main className='bg-gray-10 dark:bg-nomad-black dark:text-gray-10 mb-[27rem] max-lg:mb-[40rem] max-md:mb-[13.6rem]'>
        {isLoaded ? (
          <form onSubmit={() => false} className='relative text-[1.6rem] max-md:text-[1.4rem]'>
            <div className='flex justify-between mb-[2.4rem] '>
              <h2 className='text-[3.2rem] text-[#000] dark:text-[#fff] leading-[3.8rem] font-bold'>내 체험 등록</h2>
            </div>
            <div className='flex flex-col gap-y-[2.4rem]'>
              {/* ------제목------ */}
              <div className='flex flex-col'>
                <Input placeholder='제목' type='text' id='title' onChange={(e) => onChangeSetData(e, 'title', 25)} value={patchData.title} cssName={INPUT_STYLE} />
                <span className='self-end text-[1.2rem]'>{patchData.title.length}/25</span>
              </div>
              {/* ------카테고리------ */}
              <Dropdown
                lists={categories}
                name='카테고리'
                placeholder='카테고리'
                id='category'
                inputHeight='5.6rem'
                selectedCategoryId={selectedCategory[0].id}
                onSelectedId={(targetId) => {
                  const selected = categories.filter((category) => category.id === targetId);
                  setPatchData((prev) => ({ ...prev, category: selected[0].category }));
                }}
              />
              {/* ------설명------ */}
              <div className='flex flex-col'>
                <Textarea
                  placeholder='설명'
                  onChange={(e) => {
                    onChangeSetData(e, 'description', 800);
                  }}
                  value={patchData.description}
                />
                <span className='self-end text-[1.2rem]'>{patchData.description.length}/800</span>
              </div>
              {/* ------가격------ */}
              <div className='flex flex-col gap-y-[1.6rem]'>
                <label htmlFor='price' className={LABEL_STYLE}>
                  가격
                </label>
                <Input
                  placeholder='가격'
                  type='number'
                  id='price'
                  onChange={(e) => onChangeSetData(e, 'price', 20)}
                  defaultValue={initData.price}
                  cssName={`${INPUT_STYLE} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  onKeyUp={numberOnly}
                  onKeyDown={numberOnly}
                  autoComplete='off'
                />
              </div>
              {/* -----주소----- */}
              <div className='flex flex-col gap-y-[1.6rem]'>
                <label htmlFor='address' className={LABEL_STYLE}>
                  주소
                </label>
                <button type='button' onClick={openAddress}>
                  <Input
                    type='text'
                    placeholder='주소를 입력해주세요'
                    id='address'
                    tabIndex={-1}
                    value={patchData.address}
                    ref={addressRef}
                    readOnly
                    defaultValue={initData.address}
                    cssName={INPUT_STYLE}
                  />
                </button>
              </div>
              {/* ------예약 가능한 시간대------ */}
              <div className='flex flex-col gap-y-[2.4rem]'>
                <span className={`${LABEL_STYLE} max-md:hidden`}>예약 가능한 시간대</span>
                <div className='flex flex-col gap-y-[2.1rem] max-lg:gap-y-[1.6rem]'>
                  <div className='flex pb-[2.1rem] border-b border-gray-50 max-lg:pb-[1.6rem]'>
                    <div className={`${DATE_INPUT_LABEL_STYLE}  mr-[2rem] flex-grow max-lg:mr-[0.5rem] max-md:mr-[0.4rem]`}>
                      <label htmlFor='date' className={DATE_LABEL_STYLE}>
                        날짜
                      </label>
                      <DateInput
                        name='날짜'
                        id='date'
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
                    <span className='flex flex-col-reverse text-[2rem] leading-[2.6rem] text-black font-bold max-lg:hidden mx-[1.2rem] py-[1.5rem]'>~</span>
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
                        className='relative w-[5.6rem] h-[5.6rem] max-md:w-[4.4rem] max-md:h-[4.4rem]'
                        onClick={AddSchedule}
                        disabled={!schedule.date || !schedule.endTime || !schedule.startTime}
                      >
                        <Image src='/icons/Icon_plus_time.svg' fill alt='시간대 추가' />
                      </button>
                    </div>
                  </div>
                  {initData.schedules.map((scheduleItem) => (
                    <ScheduleListItem schedule={scheduleItem} delSchedule={() => delSchedule(scheduleItem)} key={scheduleItem.date + scheduleItem.startTime + scheduleItem.endTime} />
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
                  {patchData.bannerImageUrl && <ImageCard image={patchData.bannerImageUrl} delCard={delBannerImage} />}
                </div>
              </div>
              {/* -----소개 이미지------*/}
              <div>
                <label htmlFor='introduce' className={`${LABEL_STYLE}`}>
                  소개 이미지
                </label>
                <div className='mt-[2.4rem] flex gap-[2.4rem] flex-wrap max-lg:gap-[1.6rem] max-md:gap-[0.8rem]'>
                  <ImageInput id='introduce' uploadImage={uploadSubImage} imgInputRef={subImgRef} />
                  {!!initData.subImages.length && initData.subImages.map((subImage) => <ImageCard image={subImage.imageUrl} key={subImage.imageUrl} delCard={() => delSubImage(subImage.imageUrl)} />)}
                </div>
              </div>
              <span className='pl-[0.8rem] text-gray-500 text-[1.8rem] leading-[1.6rem]'>*이미지는 최대 4개까지 등록 가능합니다.</span>
            </div>
            <Button
              type='button'
              onClick={handleSubmit}
              color='black'
              cssName='absolute top-0 right-0 w-[12rem] h-[4.8rem] text-[1.6rem] leading-[2.6rem] rounded-[0.4rem] border-none focus:bg-gray-200'
              text='수정하기'
            />
          </form>
        ) : (
          '로딩중'
        )}
      </main>
    </MyLayout>
  );
}
