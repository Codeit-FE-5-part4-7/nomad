import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useOutsideClick from '@/hooks/useOutsideClick';
import useToggleButton from '@/hooks/useToggleButton';
import { ICON } from '@/constant';
/* eslint-disable */
const { downArrow, check } = ICON;

interface DropdownProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  labelText?: string;
  lists: { id: number; category: string; title?: string }[];
  onSelectedId: (id: number) => void;
  selectedCategoryId?: number;
  inputHeight?: string; // 사용자 지정 input 높이 속성 추가
  itemHeight?: string; // 사용자 지정 리스트 항목 높이 속성 추가
}

/**
 * Dropdown component with customizable options.
 *
 * This component displays a dropdown menu that allows users to select an option from a provided list.
 * It uses custom hooks to handle outside clicks and toggle button states.
 *
 * @param {string} name - The name attribute for the input element.
 * @param {string} [labelText] - Optional label text to be displayed above the input.
 * @param {Array<{id: number, category: string, title?: string}>} lists - The list of options to display in the dropdown.
 * @param {(id: number) => void} onSelectedId - Callback function to handle the selection of an option.
 * @param {number} [selectedCategoryId] - The ID of the initially selected category.
 * @param {string} [inputHeight] - Optional height for the input element.
 * @param {string} [itemHeight] - Optional height for each list item.
 * @param {DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} props - Additional props for the input element.
 * <Dropdown
 * name="example"
 * lists={myList}
 *  onSelectedId={handleSelectedId}
 *  inputHeight="50px"
 * itemHeight="40px"
/>

 * @returns {JSX.Element} The rendered Dropdown component.
 */
// eslint-disable-next-line react/display-name
export default forwardRef<HTMLInputElement, DropdownProps>(({ name, labelText, lists, onSelectedId, selectedCategoryId, inputHeight, itemHeight, ...props }, ref) => {
  const { isToggle, handleToggleClick } = useToggleButton();
  const list = lists ?? [];
  const [selectedList, setSelectedList] = useState<number | null>(selectedCategoryId || null);
  const dropdownRef = useRef(null);
  const findId = list.find((item) => item.id === selectedList);
  const isLabelText = findId ? (labelText ? findId.title : findId.category) : '';

  useOutsideClick(dropdownRef, isToggle, handleToggleClick);

  const handleSelectedClick = (id: number) => {
    setSelectedList(id);
    onSelectedId(id);
    handleToggleClick();
  };

  useEffect(() => {
    if (selectedCategoryId !== undefined) {
      setSelectedList(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <div className='relative flex flex-col justify-center items-start w-full text-black leading-[1.6rem]'>
      <button
        className={`relative w-full px-[1.6rem] h-[5.6rem] bg-white border border-black rounded cursor-pointer flex justify-between items-center ${isToggle ? 'rotate-arrow' : ''}`}
        type='button'
        onClick={handleToggleClick}
        ref={dropdownRef}
        style={{ height: inputHeight }} // input 높이 적용
      >
        <input {...props} className='w-full bg-white border-none cursor-pointer outline-none' name={name} readOnly value={isLabelText || ''} ref={ref} />
        {labelText && <span className='absolute top-[-0.8rem] left-[1.2rem] bg-white px-1 z-10 text-[1.6rem] font-normal'>{labelText}</span>}
        <Image
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 transition-transform ${isToggle ? 'rotate-180' : ''}`}
          src={downArrow.default.src}
          alt={downArrow.default.alt}
          width={48}
          height={48}
        />
      </button>
      <ul
        className={`z-10 flex flex-col absolute p-[0.8rem] top-[5rem] gap-y-[0.2rem] w-full bg-white rounded-[0.6rem] shadow-md ${isToggle ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity`}
        style={inputHeight ? { top: inputHeight, marginTop: '0.8rem' } : {}}
      >
        {list.map((listItem) => (
          <li key={`key-${listItem.id}`} className='h-[4rem]' style={{ height: itemHeight }}>
            <button
              type='button'
              className={`w-full h-[4rem] p-[0.8rem] flex items-center gap-x-[0.8rem] rounded hover:bg-gray-700 hover:text-white ${listItem.id === selectedList ? 'bg-gray-700 text-white' : ''}`}
              onClick={() => handleSelectedClick(listItem.id)}
              style={{ height: itemHeight }} // 리스트 항목 높이 적용
            >
              <div className='w-[2rem]'>{listItem.id === selectedList && <Image src={check.default.src} alt={check.default.alt} width={20} height={20} />}</div>
              <span>{labelText ? listItem.title : listItem.category}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
/* eslint-enable */
