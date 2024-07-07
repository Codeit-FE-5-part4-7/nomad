import { RefObject, useEffect } from 'react';

/**
 * IntersectionObserverProps 인터페이스
 * @interface
 * @property {RefObject<Element>} observerRef - 관찰할 요소의 참조 객체
 * @property {boolean} hasNextPage - 다음 페이지가 있는지 여부를 나타내는 불리언 값
 * @property {boolean} isFetching - 데이터를 가져오는 중인지 여부를 나타내는 불리언 값
 * @property {() => void} fetchNextPage - 다음 페이지를 가져오는 함수
 * @property {boolean} [loadingShow] - 로딩 상태를 나타내는 선택적 불리언 값
 */
interface IntersectionObserverProps {
  observerRef: RefObject<Element>;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  loadingShow?: boolean;
}

/**
 * useIntersectionObserver 훅
 *
 * 이 커스텀 훅은 주어진 요소가 뷰포트와 교차할 때 콜백 함수를 실행하는 Intersection Observer를 설정합니다.
 * 요소가 뷰포트와 교차하고 다음 페이지가 있으며 현재 데이터를 가져오고 있지 않은 경우 다음 페이지를 가져오는 함수를 호출합니다.
 *
 * @param {IntersectionObserverProps} props - Intersection Observer를 설정하는 데 필요한 속성들
 * @param {RefObject<Element>} props.observerRef - 관찰할 요소의 참조 객체
 * @param {boolean} props.hasNextPage - 다음 페이지가 있는지 여부를 나타내는 불리언 값
 * @param {boolean} props.isFetching - 데이터를 가져오는 중인지 여부를 나타내는 불리언 값
 * @param {() => void} props.fetchNextPage - 다음 페이지를 가져오는 함수
 * @param {boolean} [props.loadingShow] - 로딩 상태를 나타내는 선택적 불리언 값
 *
 * @returns {undefined} 반환 값은 없습니다. 명시적으로 undefined를 반환합니다.
 */
const useIntersectionObserver = ({ observerRef, hasNextPage, isFetching, fetchNextPage, loadingShow }: IntersectionObserverProps) => {
  useEffect(() => {
    if (loadingShow) {
      return undefined; // 명시적으로 undefined 반환
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
          }
        });
      },
      { threshold: 0.5 },
    );

    if (observerRef.current && hasNextPage) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerRef, hasNextPage, isFetching, fetchNextPage, loadingShow]);

  return undefined; // 명시적으로 undefined 반환
};

export default useIntersectionObserver;
