import useModalScrollBlock from '@/hooks/useModalScrollBlock';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import ReviewForm from './ReviewForm';

function Review({ closeModal, reservationInfo }: any) {
  useModalScrollBlock();

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-var-modal-bg z-[999]'>
      <div className='pt-[2.8rem] px-[2.4rem] rounded-[0.8rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] w-[48rem]'>
        <div className='flex justify-between items-center'>
          <h2 className='text-[2.8rem] text-black font-[700] leading-[2.6rem]'>후기 작성</h2>
          <button type='button' onClick={closeModal}>
            <Image width={40} height={40} src={ICON.x.default.src} alt={ICON.x.default.alt} />
          </button>
        </div>
        <div className='flex flex-col gap-[2.4rem] pt-[4.1rem] pb-[4.6rem]'>
          <div className='flex justify-between'>
            <div className='relative w-[12.6rem] h-[12.6rem] rounded-[1.2rem] bg-lightgray overflow-hidden'>
              <Image fill alt='체험 이미지' src={reservationInfo.activity.bannerImageUrl} />
            </div>
            <div className='flex flex-col gap-[1.2rem]'>
              <span className='text-[2rem] font-[700] leading-[2.6rem]'>{reservationInfo.activity.title}</span>
              <span className='text-[1.8rem] font-[400] leading-[2.4rem]'>
                {reservationInfo.date} · {reservationInfo.startTime} - {reservationInfo.endTime} · {reservationInfo.headCount}명
              </span>
              <span className='text-[3.2rem] leading-[3.819rem] font-[700] pt-[1.2rem] border-t border-opacity-10'>
                {'\uFFE6'}
                {reservationInfo.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
          <ReviewForm id={reservationInfo.id} onClickCloseModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default Review;
