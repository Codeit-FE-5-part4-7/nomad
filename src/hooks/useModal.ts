import { useContext } from 'react';
import { ModalStateContext } from '@/context/modalContext';
import { IModalContext } from '@/types/Modal';

function useModal() {
  const contextValue = useContext(ModalStateContext);

  const { modalData, openModal, closeModal } = contextValue as IModalContext;

  return {
    modalData,
    openModal,
    closeModal,
  };
}

export default useModal;
