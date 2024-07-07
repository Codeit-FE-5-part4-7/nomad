import { useState } from 'react';

/**
 * useToggleButton 훅은 boolean 상태 값을 토글하는 기능을 제공합니다.
 *
 * @returns {Object} - 토글 상태와 토글 상태를 변경하는 함수
 * @returns {boolean} isToggle - 현재 토글 상태 값
 * @returns {() => void} handleToggleClick - 토글 상태를 변경하는 함수
 *
 * @example
 * // 컴포넌트에서 사용 예제
 * const MyComponent = () => {
 *   const { isToggle, handleToggleClick } = useToggleButton();
 *
 *   return (
 *     <div>
 *       <button onClick={handleToggleClick}>
 *         {isToggle ? 'ON' : 'OFF'}
 *       </button>
 *     </div>
 *   );
 * };
 */
export default function useToggleButton(): { isToggle: boolean; handleToggleClick: () => void } {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  /**
   * handleToggleClick 함수는 isToggle 상태 값을 반전시킵니다.
   */
  const handleToggleClick = () => {
    setIsToggle((prev) => !prev);
  };

  return { isToggle, handleToggleClick };
}
