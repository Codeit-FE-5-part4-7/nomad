import { ICON } from '@/constant/importImages';
import useOutsideClick from '@/hooks/useOutsideClick';
import useToggleButton from '@/hooks/useToggleButton';
import Image from 'next/image';
import { Dispatch, SetStateAction, useRef } from 'react';
import DropdownMenu from '../DropdownMenu';
/* eslint-disable */
interface FilterProps {
  type: 'price' | 'filter';
  filterState: string;
  setFilterState: Dispatch<SetStateAction<string>>;
}

interface FilterTypeProps {
  [type: string]: {
    text?: string;
    list: {
      text: string;
      handleClick: () => void;
    }[];
  };
}

export default function Filter({ type, filterState, setFilterState }: FilterProps) {
  const { isToggle: isOpen, handleToggleClick: isOpenToggle } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref, isOpen, isOpenToggle);

  const handleDropdownOptionClick = (option: string) => {
    setFilterState(option);
    isOpenToggle();
  };

  const FilterType: FilterTypeProps = {
    price: {
      text: {
        '': '정렬',
        latest: '최신순',
        price_asc: '낮은 가격순',
        price_desc: '높은 가격순',
      }[filterState],
      list: [
        {
          text: '최신순',
          handleClick: () => handleDropdownOptionClick('latest'),
        },
        {
          text: '낮은 가격순',
          handleClick: () => handleDropdownOptionClick('price_asc'),
        },
        {
          text: '높은 가격순',
          handleClick: () => handleDropdownOptionClick('price_desc'),
        },
      ],
    },
    filter: {
      text: {
        '': '전체',
        pending: '예약 신청',
        canceled: '예약 취소',
        confirmed: '예약 승인',
        declined: '예약 거절',
        completed: '체험 완료',
      }[filterState],
      list: [
        {
          text: '전체',
          handleClick: () => handleDropdownOptionClick(''),
        },
        {
          text: '예약 신청',
          handleClick: () => handleDropdownOptionClick('pending'),
        },
        {
          text: '예약 취소',
          handleClick: () => handleDropdownOptionClick('canceled'),
        },
        {
          text: '예약 승인',
          handleClick: () => handleDropdownOptionClick('confirmed'),
        },
        {
          text: '예약 거절',
          handleClick: () => handleDropdownOptionClick('declined'),
        },
        {
          text: '체험 완료',
          handleClick: () => handleDropdownOptionClick('completed'),
        },
      ],
    },
  };

  return (
    <div className='relative w-fit min-w-[13rem]'>
      <button
        className={`flex items-end justify-between w-full h-[5.3rem] py-[1.6rem] px-[2rem] flex-shrink-0 rounded-[1.5rem] border border-darkgreen bg-white text-[1.8rem] font-medium text-[#0b3b2d]
          hover:bg-gray-200 transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`}
        onClick={isOpenToggle}
        ref={ref}
      >
        <span>{FilterType[type].text}</span>
        <Image src={ICON.filter.default.src} alt={ICON.filter.default.alt} height={22} width={22} />
      </button>
      {isOpen && <DropdownMenu dropdownMenuList={FilterType[type].list} />}
    </div>
  );
}
/* eslint-enable */
