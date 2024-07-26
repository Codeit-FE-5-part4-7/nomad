import { StatusFilter } from '@/types/StatusFilter';

export const filterCategories = ['문화·예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

export const dropFilterCategories = (handleFilterOptionClick: (status: StatusFilter) => void) => [
  {
    text: '전체',
    handleClick: () => handleFilterOptionClick(''),
  },
  {
    text: '예약 신청',
    handleClick: () => handleFilterOptionClick('pending'),
  },
  {
    text: '예약 취소',
    handleClick: () => handleFilterOptionClick('canceled'),
  },
  {
    text: '예약 승인',
    handleClick: () => handleFilterOptionClick('confirmed'),
  },
  {
    text: '예약 거절',
    handleClick: () => handleFilterOptionClick('declined'),
  },
  {
    text: '체험 완료',
    handleClick: () => handleFilterOptionClick('completed'),
  },
];
