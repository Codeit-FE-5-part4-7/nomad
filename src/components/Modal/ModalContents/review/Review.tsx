/* eslint-disable */

import Image from 'next/image';
import { Reservation } from '@/utils/types';
import ReviewForm from './ReviewForm';

/**
 * Props interface for the Review component.
 * @property {() => void} onClickCloseModal - Function to close the modal.
 * @property {Reservation} [reservationInfo] - The reservation information for the review.
 */
interface Props {
  onClickCloseModal: () => void;
  reservationInfo?: Reservation;
}

/**
 * Review Component
 *
 * This component renders the review details and includes a form for submitting a review.
 * It displays information about the reservation such as date, time, headcount, and total price.
 *
 * @param {Props} props - The properties for the component.
 * @param {() => void} props.onClickCloseModal - Function to close the modal.
 * @param {Reservation} [props.reservationInfo] - The reservation information for the review.
 *
 * @returns {JSX.Element} The rendered Review component.
 */
export default function Review({ reservationInfo, onClickCloseModal }: Props) {
  const formattedDate = reservationInfo?.date.split('-').join('.');

  return (
    <>
      <h1 className='text-[2.8rem] font-bold text-black leading-[2.6rem] mt-4 mb-[-0.5rem]'>후기 작성</h1>
      {reservationInfo && (
        <>
          <article className='flex items-start mt-[4.1rem] word-break-keep-all gap-[2.4rem] text-[1.8rem] font-normal text-gray-600'>
            <div className='relative w-[12.6rem] h-[12.6rem] rounded-[1.2rem] bg-lightgray overflow-hidden'>
              <Image fill alt='체험 이미지' src={reservationInfo.activity.bannerImageUrl} style={{ objectFit: 'cover' }} />
            </div>
            <div className='flex flex-col items-start gap-[1.2rem]'>
              <h2 className='text-[2rem] font-bold'>{reservationInfo.activity.title}</h2>
              <p className='text-[1.8rem] font-normal text-gray-600'>
                {formattedDate} {'\u00B7'} {reservationInfo.startTime}-{reservationInfo.endTime} {'\u00B7'}
                {reservationInfo.headCount}명
              </p>
              <h3 className='text-[3.2rem] font-bold pt-[1.2rem] border-t border-gray-300 w-full'>
                {'\uFFE6'} {reservationInfo.totalPrice.toLocaleString()}
              </h3>
            </div>
          </article>
          <ReviewForm id={reservationInfo.id} onClickCloseModal={onClickCloseModal} />
        </>
      )}
    </>
  );
}
/* eslint-enable */
