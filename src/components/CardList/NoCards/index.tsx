import Image from 'next/image';

/** 등록된 체험이 없을 떄 보여주기 위한 컴포넌트 */
export default function NoCards() {
  return (
    <div className='w-full flex flex-col items-center gap-y-[2rem] pt-[5.6rem] max-lg:gap-y-[1.2rem] max-lg:pt-[4rem] max-md:pt-[4.8rem]'>
      <div className='relative w-[13.1rem] h-[17.7rem] mx-[5.5rem] my-[3.1rem] max-lg:w-[11rem] max-lg:h-[14.9rem] max-lg:px-[4.5rem] max-lg:py-[2.55rem]'>
        <Image src='/svgs/no_activity.svg' fill alt='' />
      </div>
      <span className='text-[#79747E] text-[2.4rem] leading-[2.9rem] font-medium'>아직 등록한 체험이 없어요</span>
    </div>
  );
}
