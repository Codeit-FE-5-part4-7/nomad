import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/** editHref :  수정하기 버튼을 눌렀을 때 보낼 주소
 *  handleDelte : 삭제하기 버튼을 눌렀을 때 실행할 함수
 *  buttonCss : 버튼을 다르게 꾸미고 싶을 때 사용할 것
 */

export default function MeatBall({ editHref, handleDelete, buttonCss = '' }: { editHref: string; handleDelete: () => void; buttonCss?: string }) {
  const [isDropShow, setIsDropShow] = useState<boolean>(false);

  const closeDrop = () => {
    setIsDropShow(false);
  };

  useEffect(() => {
    document.body.addEventListener('click', closeDrop);
  }, []);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => {
          setTimeout(() => setIsDropShow(!isDropShow), 0);
        }}
        className={`${buttonCss} relative w-[4rem] h-[4rem] max-md:w-[3.2rem] max-md:h-[3.2rem]`}
      >
        <Image src='/icons/Icon_meatball.svg' fill alt='' />
      </button>
      {isDropShow && (
        <div className='absolute z-10 top-[4.8rem] bg-white right-0 flex flex-col rounded-[0.6rem] border-[#DDD] border'>
          <Link
            href={editHref}
            className='flex justify-center w-[16rem] max-md:w-[12rem] items-center text-[1.8rem] text-[#4B4B4B] hover:bg-gray-400 hover:text-white leading-[2.2rem] font-medium border-[#DDD] border-b py-[1.8rem]  max-md:text-[1.4rem] max-md:py-[1rem]'
          >
            수정하기
          </Link>
          <button
            type='button'
            onClick={handleDelete}
            className='flex justify-center w-[16rem] max-md:w-[12rem] items-center text-[1.8rem] text-[#4B4B4B] hover:bg-gray-400 hover:text-white font-medium leading-[2.2rem] py-[1.8rem] max-md:text-[1.4rem] max-md:py-[1rem]'
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
