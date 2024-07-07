import React from 'react';
import Image from 'next/image';
import PageItem from './PageItem';
import pageLeftIcon from '../../../public/svgs/page-left.svg';
import pageRightIcon from '../../../public/svgs/page-right.svg';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: Props) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className='flex justify-center items-center'>
      <div className='relative'>
        <button
          type='button'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex justify-center items-center p-[1.7rem] gap-[1rem] w-[4rem] h-[4rem] md:w-[5.5rem] md:h-[5.5rem] rounded-3xl border border-[#0b3b2d] bg-transparent cursor-pointer mx-2 text-[1.6rem] ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className='absolute inset-0 flex justify-center items-center'>
            <Image src={pageLeftIcon} alt='page-left' width={20} height={20} />
          </div>
        </button>
      </div>
      <ul className='flex'>
        {pageNumbers.map((pageNumber) => (
          <PageItem key={pageNumber} pageNumber={pageNumber} currentPage={currentPage} onPageChange={onPageChange} />
        ))}
      </ul>
      <div className='relative'>
        <button
          type='button'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex justify-center items-center p-[1.7rem] gap-[1rem] w-[4rem] h-[4rem] md:w-[5.5rem] md:h-[5.5rem] rounded-3xl border border-[#0b3b2d] bg-transparent cursor-pointer mx-2 text-[1.6rem] ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className='absolute inset-0 flex justify-center items-center'>
            <Image src={pageRightIcon} alt='page-right' width={20} height={20} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
