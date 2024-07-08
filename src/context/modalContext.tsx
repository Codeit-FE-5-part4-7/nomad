import { IModal, IModalContext, IModalProps } from '@/types/Modal';
import { createContext, useCallback, useMemo, useState } from 'react';

export const ModalStateContext = createContext<IModalContext | undefined>(undefined);

function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [modalData, setModalData] = useState<IModal>({
    isOpen: false,
    modalType: '',
    btnName: [''],
    content: '',
  });

  const closeModal = useCallback(() => {
    setModalData((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, [setModalData]);

  const openModal = useCallback(
    ({ modalType, content, btnName, callBackFnc }: IModalProps) => {
      setModalData({
        isOpen: true,
        modalType,
        content,
        btnName: [...btnName],
        callBackFnc,
      });
    },
    [setModalData],
  );

  const providerValue: IModalContext = useMemo(
    () => ({
      modalData,
      openModal,
      closeModal,
    }),
    [modalData, openModal, closeModal],
  );

  return <ModalStateContext.Provider value={providerValue}>{children}</ModalStateContext.Provider>;
}

export default ModalContextProvider;
