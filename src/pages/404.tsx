import Link from 'next/link';

export default function Custom404() {
  return (
    <main className='flex flex-col text-bold gap-y-[3rem] max-md:gap-y-[2rem] h-[calc(100vh-23rem)] justify-center items-center bg-gray-10 dark:bg-nomad-black text-nomad-black dark:text-gray-10'>
      <h2 className='text-[4rem] max-md:text-[2.5rem]'>404 - 페이지를 찾을 수 없습니다</h2>
      <Link
        href='/'
        className='text-[3rem] max-md:text-[1.8rem] px-[1.6rem] py-[0.8rem] rounded-[1rem] bg-nomad-black text-gray-10 dark:bg-gray-10 dark:text-nomad-black hover:bg-gray-200 hover:text-gray-500'
      >
        홈페이지로 돌아가기
      </Link>
    </main>
  );
}
