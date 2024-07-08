import Link from 'next/link';

export default function MyActivities() {
  return (
    <main className='bg-[#fafafa]'>
      <div className='flex justify-between mb-[2.4rem]'>
        <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem]'>내 체험 관리</h2>
        <Link href='/myactivities/postactivity' className='flex justify-center items-center w-[12rem] h-[4.8rem] text-[#fff] bg-[#112211] font-bold text-[1.6rem] leading-[2.6rem] rounded-[0.4rem]'>
          체험 등록하기
        </Link>
      </div>
    </main>
  );
}
