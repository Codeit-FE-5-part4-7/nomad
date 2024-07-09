// // 수정중
// import { Dispatch, SetStateAction } from 'react';
// import 'react-calendar/dist/Calendar.css';
// import DatePicker from 'react-datepicker';
// import { getMonth, getYear } from 'date-fns';
// import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker의 기본 CSS
// // import styles from '@/styles/datepicker.module.css'; // 커스텀 CSS 모듈
// import Image from 'next/image';
// import { ICON } from '@/constant/importImages';

// interface CalendarUIProps {
//   selectedDate: Date | null;
//   setSelectedDate: Dispatch<SetStateAction<Date | null>>;
//   years: number[];
//   months: string[];
// }

// function CalendarUI({ selectedDate, setSelectedDate, years, months }: CalendarUIProps) {
//   return (
//     <div className='w-[33.6rem] h-[24.1rem] flex items-center'>
//       <DatePicker
//         inline
//         dateFormat='yyyy.MM.dd'
//         formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
//         showYearDropdown
//         scrollableYearDropdown
//         shouldCloseOnSelect
//         yearDropdownItemNumber={100}
//         minDate={new Date('2000-01-01')}
//         maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 30))}
//         selected={selectedDate}
//         // calendarClassName={`${styles.datepicker} ${styles['custom-datepicker']}`} // 커스텀 클래스 적용
//         dayClassName={(date) => (selectedDate && date.getDate() === selectedDate.getDate() ? styles.selectedDay : styles.hoverDay)}
//         onChange={(date) => setSelectedDate(date)}
//         className='flex items-center border border-[#D1D5DB] rounded bg-[#0b3b2d] w-full h-full text-white text-center pr-4'
//         renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
//           <div className='flex justify-between items-center bg-[#ffffff] px-3 py-2 w-full'>
//             <button
//               type='button'
//               onClick={decreaseMonth}
//               className='w-9 h-9 p-1 rounded-full hover:bg-[rgba(255,255,255,0.08)] disabled:bg-[#1F2937] disabled:cursor-default'
//               disabled={prevMonthButtonDisabled}
//             >
//               <Image width={16} height={16} src={ICON.leftArrow.default.src} alt={ICON.leftArrow.default.alt} />
//             </button>
//             <div className={`${styles['custom-month-container']} custom-month-container`}>
//               <span className='text-lg font-medium'>{months[getMonth(date)]}</span>
//               <select value={getYear(date)} className={`${styles['custom-year-select']} custom-year-select`} onChange={({ target: { value } }) => changeYear(+value)}>
//                 {years.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               type='button'
//               onClick={increaseMonth}
//               className='w-9 h-9 p-1 rounded-full hover:bg-[rgba(255,255,255,0.08)] ml-6 disabled:bg-transparent disabled:cursor-default'
//               disabled={nextMonthButtonDisabled}
//             >
//               <Image width={16} height={16} src={ICON.rightArrow.default.src} alt={ICON.rightArrow.default.alt} />
//             </button>
//           </div>
//         )}
//       />
//     </div>
//   );
// }

// export default CalendarUI;
