export interface IModal {
  isOpen: boolean;
  modalType: '' | 'alert' | 'confirm';
  content: JSX.Element | string;
  btnName: [string, string?];
  callBackFnc?: () => void | Promise<void>;
}

export interface IModalProps {
  modalType: '' | 'alert' | 'confirm';
  content: JSX.Element | string;
  btnName: [string, string?];
  callBackFnc?: () => void | Promise<void>;
}

export interface IModalContentProps {
  modalData: IModalProps;
  closeFunction: () => void;
}

export interface IModalContext {
  modalData: IModal;
  openModal: ({ modalType, content, btnName, callBackFnc }: IModalProps) => void;
  closeModal: () => void;
}
