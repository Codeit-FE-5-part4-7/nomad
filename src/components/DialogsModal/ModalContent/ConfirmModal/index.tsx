import Button from '@/components/Button';
import Image from 'next/image';
import { IModalContentProps } from '@/types/DialogsModal';
import { ICON } from '@/constant/importImages';
import useModalScrollBlock from '@/hooks/useModalScrollBlock';

function ConfirmModal({ modalData, closeFunction }: IModalContentProps) {
  useModalScrollBlock();

  return (
    <div className='w-[29.8rem] p-[2.4rem] rounded-[0.8rem] text-center flex flex-col gap-[3.2rem] items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] z-[999]'>
      <div className='flex flex-col items-center gap-[1.6rem]'>
        <div className='size-[2.4rem] rounded-[50%] bg-[#112211] flex justify-center items-center'>
          <Image width={12} height={12} src={ICON.check.default.src} alt={ICON.check.default.alt} />
        </div>
        <span className='font-[500] text-[1.8rem] text-[#333236] leading-[2.148rem]'>{modalData.content}</span>
      </div>
      <div className='flex gap-[0.8rem]'>
        <Button cssName='w-[8rem]' text={modalData.btnName[0]} color='white' onClick={closeFunction} />
        {modalData.btnName[1] !== undefined && <Button cssName='w-[8rem]' text={modalData.btnName[1]} color='black' onClick={modalData.callBackFnc ? modalData.callBackFnc : closeFunction} />}
      </div>
    </div>
  );
}

export default ConfirmModal;
