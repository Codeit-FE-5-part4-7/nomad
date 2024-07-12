import React, { useState } from 'react';
import ImageContainer from '@/components/ImageContainer';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import FloatingBox from '@/components/FloatingBox';
import Pagination from '@/components/Pagination';
import Map from '@/components/Map';

function ActivityDetail() {
  // 내가 만든 체험인 경우에만 케밥 버튼 나타나게 로직 수정하기
  // const [isDropShow, setIsDropShow] = useState<boolean>(false);

  // const closeDrop = () => {
  //   setIsDropShow(false);
  // };

  // useEffect(() => {
  //   document.body.addEventListener('click', closeDrop);
  //   return () => {
  //     document.body.removeEventListener('click', closeDrop);
  //   };
  // }, []);

  // ----------------------------------------------------------
  // Pagination search parameter 추가하기
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 목업 데이터
  const reviews = [
    {
      id: 'test_kitty',
      image: '/images/test_kitty.png',
      name: 'test',
      date: '2070.06.13',
      text: '후기 후기 후기 후기 훅이 훅 훅 훅 flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test flex test flex test flext test',
    },
    {
      id: 'test_kitty2',
      image: '/images/test_kitty2.png',
      name: 'test2',
      date: '2080.06.13',
      text: '짧은 댓글',
    },
    {
      id: 'test_kitty3',
      image: '/images/test_kitty3.png',
      name: 'test3',
      date: '2090.06.13',
      text: '길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 일정 이상되면 테스트 길이 테스트 길이 테스트 테스트',
    },
  ];

  return (
    <div className='mt-[14rem]'>
      <div className='flex flex-col gap-[0.25rem] px-[18rem]'>
        <p className='text-[1.4rem] text-[#112211]'>문화·예술</p>
        <div>
          <h1 className='text-[3.2rem] text-[#112211] font-bold'>함께 배우면 즐거운 스트릿 댄스</h1>
        </div>

        <div className='flex gap-[1.2rem]'>
          <div className='flex gap-[0.6rem]'>
            <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
            <p className='text-[1.4rem] text-[#1b1b1b]'>4.9</p>
            <p className='text-[1.4rem] text-[#1b1b1b]'>(293)</p>
          </div>

          <div className='flex gap-[0.2rem]'>
            <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[1.4rem] text-[#112211]'>서울 중구 청계천로 100 10F</p>
          </div>
        </div>

        <ImageContainer mainImageUrl='/images/banner_main.png' gridImages={[]} />

        <div className='flex gap-[1.6rem]'>
          <div className='w-[79rem] mb-[8rem]'>
            <div className='border-t-[0.2rem] border-[#dddddd] border-solid mt-[8.5rem]' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='text-[#112211] font-bold text-[2rem] pt-[4rem]'>체험 설명</p>
              <p className='text-[#112211] text-[1.6rem]'>
                안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희
                체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수
                있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접
                강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을
                접할 수 있을 것입니다.
              </p>
            </div>
            <div className='border-t-[0.2rem] border-[#dddddd] border-solid my-[4rem]' />
            <Map address='서울 중구 청계천로 100 10F' />
            <div className='flex gap-[0.4rem] mt-[0.8rem]'>
              <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
              <p className='text-[#112211] text-[1.4rem] max-w-[70rem] overflow-hidden whitespace-nowrap text-ellipsis'>서울 중구 청계천로 100 10F</p>
            </div>
            <div className='border-t-[0.2rem] border-[#dddddd] border-solid my-[4rem]' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='text-[#112211] font-bold text-[2rem]'>후기</p>
              <div className='flex gap-[1.6rem] items-center'>
                <p className='text-[5rem] font-bold'>4.2</p>
                <div className='flex flex-col gap-[0.4rem]'>
                  <p className='text-[1.8rem] text-[#112211]'>매우 만족</p>
                  <div className='flex items-center gap-[0.6rem]'>
                    <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
                    <p className='text-[#1b1b1b] text-[1.4rem]'>1300개 후기</p>
                  </div>
                </div>
              </div>
            </div>

            {reviews.map((review, index) => (
              <div key={review.id} className={`flex gap-[1.6rem] py-[2.4rem] ${index !== reviews.length - 1 ? 'border-b-[0.2rem] border-[#E3E6E8] border-solid' : ''}`}>
                <div className='flex-shrink-0'>
                  <Image src={review.image} alt='profile_image_test' width={45} height={45} className='rounded-full object-cover border border-[#dddddd] border-solid w-[4.5rem] h-[4.5rem]' />
                </div>
                <div>
                  <div className='flex mb-[0.8rem]'>
                    <p className='text-[1.6rem] font-bold max-w-[50rem] overflow-hidden whitespace-nowrap text-ellipsis'>{review.name}</p>
                    <p className='mx-[0.8rem] text-[1.4rem]'>|</p>
                    <p className='text-[1.6rem] text-[#a4a1aa]'>{review.date}</p>
                  </div>
                  <p className='text-[1.6rem] text-[#112211]'>{review.text}</p>
                </div>
              </div>
            ))}

            <div className='mt-[7.2rem] mb-[41rem]'>
              <Pagination currentPage={currentPage} totalPages={12} onPageChange={handlePageChange} />
            </div>
          </div>
          <div className='mt-[8.5rem] ml-[1.4rem]'>
            <FloatingBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;
