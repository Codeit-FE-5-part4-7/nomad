import React from 'react';

interface Props {
  pageNumber: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

function PageItem({ pageNumber, currentPage, onPageChange }: Props) {
  const PageLinkComponent = pageNumber === currentPage ? 'bg-green-dark text-white border-none' : 'text-green-dark border-green-dark';

  return (
    <li className='inline-block mx-1'>
      <button
        type='button'
        onClick={() => onPageChange(pageNumber)}
        className={`flex justify-center items-center p-[1.7rem] gap-[1rem] w-[4rem] h-[4rem] md:w-[5.5rem] md:h-[5.5rem] rounded-3xl border ${PageLinkComponent} hover:bg-green-dark hover:text-white cursor-pointer text-[1.6rem]`}
      >
        {pageNumber}
      </button>
    </li>
  );
}

export default PageItem;
