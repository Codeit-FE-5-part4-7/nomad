import { useState, useRef } from 'react';

/* eslint-disable */
interface UsePopupReturn {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  popupStyles: React.CSSProperties;
  setPopupPosition: (element: HTMLElement | null) => void;
}

const usePopup = (isMobile: boolean): UsePopupReturn => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupStyles, setPopupStyles] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement | null>(null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const setPopupPosition = (element: HTMLElement | null) => {
    if (element && cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const windowScrollX = window.scrollX;
      const windowScrollY = window.scrollY;

      const positionStyles: React.CSSProperties = {
        position: 'absolute',
        top: cardRect.bottom + windowScrollY,
        left: cardRect.left + windowScrollX,
        zIndex: 1000,
        maxWidth: isMobile ? '90%' : '48rem',
        maxHeight: isMobile ? '90%' : '60rem',
      };

      setPopupStyles(positionStyles);
    }
  };

  return {
    isPopupOpen,
    openPopup,
    closePopup,
    popupStyles,
    setPopupPosition,
  };
};

export default usePopup;

/* eslint-enable */
