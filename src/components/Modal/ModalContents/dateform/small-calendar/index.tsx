/* eslint-disable */

import Calendar from 'react-calendar';
import { MutableRefObject } from 'react';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import { Value } from '../DateForm';

interface CalendarProps {
  value?: Value;
  onChange: (data: Value | string) => void;
  ref?: MutableRefObject<null>;
  abledDate?: string[];
}

/**
 * SmallCalendar component for selecting dates.
 *
 * This component uses the `react-calendar` library to display a calendar that allows users to select dates.
 * It supports custom styling and can disable dates that are not in the `abledDate` array.
 *
 * @param {Object} props - The properties for the SmallCalendar component.
 * @param {Value} [props.value] - The current selected date or date range.
 * @param {(data: Value | string) => void} props.onChange - Callback function to handle date changes.
 * @param {MutableRefObject<null>} [props.ref] - Optional ref for the calendar component.
 * @param {string[]} [props.abledDate] - Array of dates that are selectable. Dates not in this array will be disabled.
 *
 * @returns {JSX.Element} The rendered SmallCalendar component.
 */
export default function SmallCalendar({ onChange, value, ref, abledDate }: CalendarProps) {
  return (
    <div className='p-4 mx-auto min-w-[24rem] max-w-[37.3rem] border border-gray-300 rounded-xl md:p-6 md:mx-8'>
      <Calendar
        minDate={new Date()}
        locale='en'
        ref={ref}
        value={value}
        onChange={onChange}
        tileDisabled={({ date }) => (abledDate ? !abledDate.find((day) => day === moment(date).format('YYYY-MM-DD')) : false)}
        className='text-sm font-semibold text-gray-600 max-w-full rounded-xl font-openSans'
      />
      <style jsx global>{`
        .react-calendar__navigation {
          @apply flex justify-between items-center;
        }
        .react-calendar__navigation button {
          @apply w-4 text-3xl font-bold text-black;
        }
        .react-calendar__navigation button span {
          @apply text-2xl font-bold text-black;
        }
        .react-calendar__navigation button:disabled {
          @apply text-gray-300;
        }
        .react-calendar__navigation button:hover,
        .react-calendar__navigation button:focus {
          @apply bg-lightgreen rounded-md;
        }
        .react-calendar__month-view__weekdays {
          @apply text-base font-bold text-gray-600 p-4 text-center;
        }
        abbr[title] {
          text-decoration: none;
        }
        .react-calendar__month-view__days__day--neighboringMonth,
        .react-calendar__decade-view__years__year--neighboringDecade,
        .react-calendar__century-view__decades__decade--neighboringCentury {
          @apply text-gray-400;
        }
        .react-calendar__year-view .react-calendar__tile,
        .react-calendar__decade-view .react-calendar__tile,
        .react-calendar__century-view .react-calendar__tile {
          @apply p-4;
        }
        .react-calendar__tile {
          @apply max-w-full p-4 bg-none text-center font-inherit;
        }
        .react-calendar__tile:disabled {
          @apply text-gray-400;
        }
        .react-calendar__tile--now {
          @apply bg-lightgreen rounded-lg font-bold text-darkgreen;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus,
        .react-calendar__tile--active {
          @apply bg-darkgreen text-white rounded-lg;
        }
        .react-calendar__tile,
        .react-calendar__month-view__days__day {
          @apply text-gray-400;
        }
        .react-calendar__month-view__days__day--neighboringMonth:disabled,
        .react-calendar__decade-view__years__year--neighboringDecade:disabled,
        .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
          @apply text-gray-300;
        }
      `}</style>
    </div>
  );
}
/* eslint-enable */
