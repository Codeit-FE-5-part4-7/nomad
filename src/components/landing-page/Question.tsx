import { RefObject } from 'react';
import LandingPageButton from './CustomButton';
/* eslint-disable */
interface Props {
  text: string;
  dialogRef: RefObject<HTMLDialogElement>;
  buttonText: string;
  onClick: () => void;
}

export default function Question({ dialogRef, text, buttonText, onClick }: Props) {
  const handleButtonClick = () => {
    onClick();
    handleCloseClick();
  };

  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  return (
    <dialog className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-46 rounded-lg shadow-lg bg-white backdrop-opacity-70 backdrop-bg-black' ref={dialogRef}>
      <p className='text-center text-lg font-normal text-[#333236] py-8 px-0 font-sans leading-7'>{text}</p>
      <div className='flex justify-center items-center gap-2 mt-8'>
        <LandingPageButton onClick={handleCloseClick} size='sm' variant='outline' text='아니오' />
        <LandingPageButton onClick={handleButtonClick} size='sm' text={buttonText} />
      </div>
    </dialog>
  );
}
/* eslint-enable */
