import React from 'react';
import ImageContainer from '@/components/ImageContainer';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import FloatingBox from '@/components/FloatingBox';
import Map from '@/components/Map';
import ReviewList from '@/components/ReviewList';

function ActivityDetail() {
  return (
    <div className='mt-0 px-[18rem]'>
      <div className='flex flex-col gap-[0.25rem]'>
        <p className='text-[1.4rem] text-nomad-black'>문화·예술</p>
        <div>
          <h1 className='text-[3.2rem] text-nomad-black font-bold'>함께 배우면 즐거운 스트릿 댄스</h1>
        </div>

        <div className='flex gap-[1.2rem]'>
          <div className='flex gap-[0.6rem]'>
            <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
            <p className='text-[1.4rem] text-black'>4.9</p>
            <p className='text-[1.4rem] text-black'>(293)</p>
          </div>

          <div className='flex gap-[0.2rem]'>
            <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[1.4rem] text-nomad-black'>서울 중구 청계천로 100 10F</p>
          </div>
        </div>

        <ImageContainer mainImageUrl='/images/banner_main.png' gridImages={[]} />

        <div className='flex gap-[1.6rem]'>
          <div className='w-[79rem] mb-[8rem]'>
            <div className='border-t-[0.2rem] border-gray-50 border-solid' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='text-nomad-black font-bold text-[2rem] pt-[4rem]'>체험 설명</p>
              <p className='text-nomad-black text-[1.6rem]'>
                안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희
                체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수
                있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접
                강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을
                접할 수 있을 것입니다.
              </p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <Map address='서울 중구 청계천로 100 10F' />
            <div className='flex gap-[0.4rem] mt-[0.8rem]'>
              <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
              <p className='text-nomad-black text-[1.4rem] max-w-[70rem] overflow-hidden whitespace-nowrap text-ellipsis'>서울 중구 청계천로 100 10F</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />
            <ReviewList reviews={[]} averageRating={0} reviewCount={0} />
          </div>
          <div className='ml-[1.4rem]'>
            <FloatingBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;
