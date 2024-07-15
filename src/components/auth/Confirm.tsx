import { RefObject } from 'react';
import SubmitButton from './SubmitButton';
/* eslint-disable */
interface Props {
  text: string;
  dialogRef: RefObject<HTMLDialogElement>;
  handleClickSuccessConfirm?: () => void;
}

export default function Confirm({ text, dialogRef, handleClickSuccessConfirm }: Props) {
  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    if (handleClickSuccessConfirm) {
      handleClickSuccessConfirm();
    }
  };

  return (
    <dialog
      className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-135 h-62.5 rounded-lg border-none backdrop:opacity-70 backdrop:bg-[#000000b2] max-w-full max-h-88'
      ref={dialogRef}
    >
      <div className='md:w-[54rem] md:h-[25rem] w-[32.7rem] h-[22rem] bg-white'>
        <p className='md:text-[1.8rem] text-[1.6rem] font-medium text-[#333236] absolute left-1/2 top-[calc(50%-2.1rem)] transform -translate-x-1/2'>{text}</p>
        <div className='absolute right-7 bottom-7'>
          <SubmitButton onClick={handleCloseClick} size='md' text='확인' />
        </div>
      </div>
    </dialog>
  );
}
/* eslint-enable */
