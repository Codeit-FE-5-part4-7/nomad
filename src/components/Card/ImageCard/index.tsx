import Image from 'next/image';

export default function ImageCard({ image, delCard }: { image: string; delCard: () => void }) {
  return (
    <div className='relative'>
      <div className='relative w-[18rem] h-[18rem] rounded-[2.4rem] max-lg:w-[20.4rem] max-lg:h-[20.4rem] max-md:w-[16.7rem] max-md:h-[16.7rem] overflow-hidden'>
        <Image src={image} fill alt='등록한 이미지' />
      </div>
      <button
        type='button'
        onClick={delCard}
        className='absolute top-[-2rem] right-[-2rem] max-lg:top-[-1.6rem] max-lg:right-[-1.6rem] max-md:top-[-1.2rem] max-md:right-[-1.2rem] bg-[#272727] bg-opacity-[0.8] rounded-full w-[4rem] h-[4rem] max-lg:w-[3.2rem] max-lg:h-[3.2rem] max-md:w-[2.4rem] max-md:h-[2.4rem] bg-[length:1.8rem_1.8rem] max-lg:bg-[length:1.45rem_1.45rem] max-md:bg-[length:1.15rem_1.15rem] bg-[url("/icons/Icon_X_white.svg")]  bg-center bg-no-repeat'
      />
    </div>
  );
}
