import React, { Dispatch, SetStateAction } from 'react';
import PaginationUI from '../Pagination'; // 첫 번째로 주신 Pagination 컴포넌트를 import
/* eslint-disable */
interface Props {
  data: {
    totalCount: number;
  };
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  PAGE_LIMIT: number;
}

const EnhancedPagination: React.FC<Props> = ({ data, currentPage, setCurrentPage, PAGE_LIMIT }) => {
  const totalPage = Math.ceil(data?.totalCount / PAGE_LIMIT);

  return <PaginationUI totalPages={totalPage} currentPage={currentPage} onPageChange={setCurrentPage} />;
};

export default EnhancedPagination;
/* eslint-enable */
