import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
}

/**
 * Custom hook to get the current window size.
 *
 * @returns {WindowSize} An object containing the current window width.
 *
 * @example
 * const { width } = useWindowSize();
 * console.log(width); // Outputs the current window width
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : undefined,
  });

  useEffect(() => {
    let timeoutId: number | null = null;

    /**
     * Handles the window resize event by updating the window size after a debounce.
     */
    const handleResize = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
          });
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

/**
 * Custom hook to get a responsive size value based on the current window width.
 *
 * @param {number} [P=8] - The size value for window widths >= 1200px.
 * @param {number} [T=9] - The size value for window widths >= 768px and < 1200px.
 * @param {number} [M=4] - The size value for window widths >= 430px and < 768px.
 * @param {number} [S=4] - The size value for window widths < 430px.
 * @returns {number} The size value corresponding to the current window width.
 *
 * @example
 * const size = useResponsiveSize(10, 7, 5, 3);
 * console.log(size); // Outputs the responsive size based on the window width
 */
const useResponsiveSize = (P = 8, T = 9, M = 4, S = 4): number => {
  const { width } = useWindowSize();
  const [sizeState, setSizeState] = useState<number>(8);

  useEffect(() => {
    if (!width) return;

    if (width >= 1200) {
      setSizeState(P);
      return;
    }

    if (width >= 768) {
      setSizeState(T);
      return;
    }

    if (width >= 430) {
      setSizeState(M);
      return;
    }

    if (width < 430) {
      setSizeState(S);
    }
  }, [P, T, M, S, width]);

  return sizeState;
};

export default useResponsiveSize;
