import React from 'react';

interface PageItemProps {
  pageNumber: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

function PageItem({ pageNumber, currentPage, onPageChange }: PageItemProps) {
  const PageLinkComponent = pageNumber === currentPage ? 'bg-[#0b3b2d] text-white border-none' : 'text-green border-[#0b3b2d]';

  return (
    <li className='inline-block mx-1'>
      <button
        type='button'
        onClick={() => onPageChange(pageNumber)}
        className={`flex justify-center items-center p-[1.7rem] px-[3rem] gap-[1rem] w-[5.5rem] h-[5.5rem] rounded-3xl border ${PageLinkComponent} hover:bg-[#0b3b2d] hover:text-white cursor-pointer text-[1.6rem]`}
      >
        {pageNumber}
      </button>
    </li>
  );
}

export default PageItem;
