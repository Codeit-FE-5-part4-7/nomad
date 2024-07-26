import React from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { addDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  reservedDates: (string | Date)[];
}

const isReservedDate = (date: Date, reservedDates: (string | Date)[]): boolean => {
  const dateToCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return reservedDates.some((reservedDate) => {
    const reservedDateObj = typeof reservedDate === 'string' ? new Date(reservedDate) : reservedDate;

    const reservedDateToCompare = new Date(reservedDateObj.getFullYear(), reservedDateObj.getMonth(), reservedDateObj.getDate());

    return dateToCompare.getTime() === reservedDateToCompare.getTime();
  });
};

function CustomCalendar({ selectedDate, onChange, reservedDates }: CustomCalendarProps): JSX.Element {
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (Array.isArray(value)) {
      onChange(value[0]);
    } else {
      onChange(value);
    }
  };

  const tileClassName = ({ date }: { date: Date }) => (isReservedDate(date, reservedDates) ? 'reserved-date' : null);

  return (
    <div className='calendar-container'>
      <Calendar onChange={handleDateChange} value={selectedDate} minDate={addDays(new Date(), 1)} locale='en-US' className='custom-calendar' tileClassName={tileClassName} />
    </div>
  );
}

export default CustomCalendar;
