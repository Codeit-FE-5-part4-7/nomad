import React from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { addDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

function CustomCalendar({ selectedDate, onChange }: CustomCalendarProps): JSX.Element {
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (Array.isArray(value)) {
      onChange(value[0]);
    } else {
      onChange(value);
    }
  };

  return (
    <div className='calendar-container'>
      <Calendar onChange={handleDateChange} value={selectedDate} minDate={addDays(new Date(), 1)} locale='en-US' className='custom-calendar' />
    </div>
  );
}

export default CustomCalendar;
