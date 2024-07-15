export const filterCategories = ['문화·예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

export const dropFilterCategories = (handleFilterOptionClick: (text: string) => void) => [
  {
    text: '예약 신청',
    handleClick: () => handleFilterOptionClick('예약 신청'),
  },
  {
    text: '예약 취소',
    handleClick: () => handleFilterOptionClick('예약 취소'),
  },
];
