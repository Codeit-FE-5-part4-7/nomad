import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes, InputHTMLAttributes, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import useToggleButton from '@/hooks/useToggleButton';
import { USER_PASSWORD_SHOW, ICON } from '@/constant';
import useOutsideClick from '@/hooks/useOutsideClick';
import SmallCalendar from '../Modal/ModalContents/dateform/small-calendar';
import { Value } from '../Modal/ModalContents/dateform/DateForm';
import { postformatDate, displayDateFormat } from '../Modal/ModalContents/utils/dateChange';
/* eslint-disable */
interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'number' | 'time';
  isError?: boolean;
  errorMessage?: string;
  cssName?: string;
}

/**
 * Input component with customizable types and error handling.
 *
 * @param {Object} props - The properties for the Input component.
 * @param {'text' | 'password' | 'email' | 'number' | 'time'} props.type - The type of input.
 * @param {boolean} [props.isError] - Flag indicating if there is an error.
 * @param {string} [props.errorMessage] - Error message to display.
 * @returns {JSX.Element} The rendered Input component.
 */
// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(({ type, isError, errorMessage, cssName, ...props }, ref) => {
  const { isToggle, handleToggleClick } = useToggleButton();
  const { src, alt, inputType } = isToggle ? USER_PASSWORD_SHOW.on : USER_PASSWORD_SHOW.off;

  return (
    <>
      <div className='relative w-full'>
        <input
          {...props}
          ref={ref}
          type={type === 'password' ? inputType : type}
          className={`${cssName} bg-white text-black w-full p-4 rounded-md border transition text-[1.6rem]  ${
            isError ? 'border-red-500' : 'border-gray-400 focus:border-darkgreen'
          } ${type === 'number' ? 'appearance-none' : ''} ${type === 'time' ? 'md:p-4 md:px-2' : ''}`}
          placeholder={props.placeholder}
        />
        {type === 'password' && (
          <button type='button' onClick={handleToggleClick} className='flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 right-4'>
            <Image src={src} alt={alt} width={24} height={24} />
          </button>
        )}
      </div>
      {isError && <p className='text-red-500 text-[12px] pl-2'>{errorMessage}</p>}
    </>
  );
});

const { calendar } = ICON;

interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onPostDataValue: (value: string) => void;
  name: string;
  cssName?: string; //사용자 지정 스타일 적용
}

/**
 * DateInput component with a calendar picker.
 *
 * @param {Object} props - The properties for the DateInput component.
 * @param {string} props.name - The name attribute for the input element.
 * @param {(value: string) => void} props.onPostDataValue - Callback function to handle the selected date value.
 * @returns {JSX.Element} The rendered DateInput component.
 */
// eslint-disable-next-line react/display-name
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(({ name, onPostDataValue, cssName, ...props }, ref) => {
  const [calenderValue, onChangeCalender] = useState<Value>();

  const { isToggle, handleToggleClick } = useToggleButton();
  const [selectedDate, setSelectedDate] = useState('');
  const outsideRef = useRef(null);

  useOutsideClick(outsideRef, isToggle, handleToggleClick);

  const nextShowValue = useMemo(() => calenderValue && displayDateFormat(calenderValue as Date), [calenderValue]);
  const nextPostValue = useMemo(() => calenderValue && postformatDate(calenderValue as Date), [calenderValue]);
  useMemo(() => {
    if (!nextShowValue) return;

    setSelectedDate(nextShowValue);
    onPostDataValue(nextPostValue as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calenderValue]);

  const handleDateSelected = (data: string | Value) => {
    onChangeCalender(data as Value);
    setSelectedDate(data as string);
    handleToggleClick();
  };

  return (
    <div className='relative w-full'>
      <button className={`${cssName} inline-flex items-center w-full relative z-10 px-[1.6rem] py-[0.8rem] bg-white border border-gray-400 rounded-md`} type='button' onClick={handleToggleClick}>
        <input
          {...props}
          className='w-full text-[1.6rem] font-normal text-black bg-white border-none focus:outline-none'
          name={name}
          type='text'
          value={selectedDate || ''}
          readOnly
          placeholder='YY/MM/DD'
          ref={ref}
        />
        <div className='absolute top-1/2 transform -translate-y-1/2 right-2.5'>
          <Image src={calendar.default.src} alt={calendar.default.alt} width={28} height={28} />
        </div>
      </button>

      {isToggle && (
        <div className='absolute right-8 top-20 bg-gray-200 border border-gray-400 rounded-lg p-3 z-20'>
          <SmallCalendar value={calenderValue} onChange={handleDateSelected} ref={outsideRef} />
        </div>
      )}
    </div>
  );
});

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  isError?: boolean;
  errorMessage?: string;
}

/**
 * Textarea component with error handling.
 *
 * @param {Object} props - The properties for the Textarea component.
 * @param {boolean} [props.isError] - Flag indicating if there is an error.
 * @param {string} [props.errorMessage] - Error message to display.
 * @returns {JSX.Element} The rendered Textarea component.
 */
// eslint-disable-next-line react/display-name
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ isError, errorMessage, ...props }, ref) => (
  <>
    <div className='relative w-full'>
      <textarea
        {...props}
        ref={ref}
        className={`w-full h-[34.6rem] p-[1.6rem] border rounded-md resize-none transition ${isError ? 'border-red-500' : 'border-gray-400'} focus:border-darkgreen placeholder-gray-600`}
      />
    </div>
    {isError && <p className='pl-2 text-sm text-red-500'>{errorMessage}</p>}
  </>
));

// eslint-disable-next-line react/require-default-props
Input.defaultProps = {
  isError: false,
  errorMessage: '',
};

// eslint-disable-next-line react/require-default-props
DateInput.defaultProps = {
  onPostDataValue: () => {},
};

// eslint-disable-next-line react/require-default-props
Textarea.defaultProps = {
  isError: false,
  errorMessage: '',
};
/* eslint-enable */
