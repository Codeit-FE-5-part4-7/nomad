import useModal from '@/hooks/useModal';
import AlertModal from './ModalContent/AlertModal';
import ConfirmModal from './ModalContent/ConfirmModal';

function Modal() {
  const { modalData, closeModal } = useModal();

  return (
    modalData.isOpen && (
      <div className='fixed top-0 right-0 bottom-0 left-0 bg-black opacity-80'>
        {modalData.modalType === 'alert' && <AlertModal modalData={modalData} closeFunction={closeModal} />}
        {modalData.modalType === 'confirm' && <ConfirmModal modalData={modalData} closeFunction={closeModal} />}
      </div>
    )
  );
}

export default Modal;
