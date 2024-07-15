import { useRouter } from 'next/router';
import { useRef } from 'react';
import Question from './Question';

export default function PostActivityButton() {
  const router = useRouter();
  const questionRef = useRef<HTMLDialogElement>(null);

  const handlePostActivityButtonClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      router.push('/addActivity');
      return;
    }
    if (!questionRef.current) return;
    questionRef.current.showModal();
  };

  const handleDirectSignin = () => {
    router.push('/signin');
  };

  return (
    <>
      <button
        className='bg-[#0b3b2d] text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 ease-in-out md:text-base md:py-2'
        type='button'
        onClick={handlePostActivityButtonClick}
      >
        체험 등록
      </button>
      <Question dialogRef={questionRef} text='로그인 하시겠습니까?' onClick={handleDirectSignin} buttonText='예' />
    </>
  );
}
