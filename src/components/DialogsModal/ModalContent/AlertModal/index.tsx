import Button from '@/components/Button';
import useModalScrollBlock from '@/hooks/useModalScrollBlock';
import { IModalContentProps } from '@/types/DialogsModal';

function AlertModal({ modalData, closeFunction }: IModalContentProps) {
  useModalScrollBlock();

  const handleClick = async () => {
    closeFunction();
    if (modalData.callBackFnc) {
      await modalData.callBackFnc();
    }
  };

  return (
    <div className='sm:w-[54rem] sm:h-[25rem] rounded-[0.8rem] text-center flex items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] z-999 w-[32.7rem] h-[22rem]'>
      <span className='font-[500] text-[1.8rem] text-[#333236] leading-[2.148rem] relative top-[-2.7rem] sm:top-unset'>{modalData.content}</span>
      <div className='absolute bottom-[2.8rem] sm:right-[2.8rem] sm:w-[12rem] sm:h-[4.8rem] text-[1.6rem] w-[13.8rem] h-[4.2rem] right-[9.4rem]'>
        <Button text={modalData.btnName[0]} color='black' onClick={handleClick} />
      </div>
    </div>
  );
}

export default AlertModal;
