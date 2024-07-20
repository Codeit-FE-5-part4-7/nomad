import { useContext } from 'react';
import { ModalStateContext } from '@/context/modalContext';
import { IModalContext } from '@/types/DialogsModal';

function useModal() {
  const contextValue = useContext(ModalStateContext);

  const { modalData, openModal, closeModal, isModalOpen } = contextValue as IModalContext;

  return {
    modalData,
    openModal,
    closeModal,
    isModalOpen,
  };
}

export default useModal;
