import { MutableRefObject, useEffect, useCallback } from 'react';

/**
 * useOutsideClick 훅은 주어진 ref가 가리키는 요소의 외부 클릭을 감지하여, 특정 상태가 true일 때 close 함수를 호출합니다.
 *
 * @param {MutableRefObject<HTMLElement | null>} ref - 감지할 DOM 요소를 가리키는 ref 객체
 * @param {boolean} state - 외부 클릭 감지 활성화 여부를 결정하는 상태 값
 * @param {() => void} close - 외부 클릭이 감지되었을 때 호출되는 함수
 */
const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, state: boolean, close: () => void): void => {
  /**
   * handleOutsideClick 함수는 클릭 이벤트가 ref가 가리키는 요소 외부에서 발생했는지 확인하고,
   * 외부에서 발생했을 경우 close 함수를 호출합니다.
   *
   * @param {MouseEvent} e - 클릭 이벤트 객체
   */
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (state && ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    },
    [state, ref, close],
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);
};

export default useOutsideClick;
