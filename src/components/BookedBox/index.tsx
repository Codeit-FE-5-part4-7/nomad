import React from 'react';

export type Reservation = {
  date: string;
  status: '예약' | '완료' | '승인';
};

type BookedBoxProps = {
  reservations: Reservation[];
};

const statusStyles = {
  예약: 'bg-blue text-white',
  완료: 'bg-gray-50 text-gray500',
  승인: 'bg-orange-light text-orange',
};

function BookedBox({ reservations }: BookedBoxProps) {
  return (
    <div className='flex flex-col-reverse w-[100%] h-[80%] gap-[0.25rem]'>
      {reservations.map((reservation) => (
        <div key={`${reservation.date}-${reservation.status}`} className={`rounded ${statusStyles[reservation.status]} text-center`}>
          {reservation.status}
        </div>
      ))}
    </div>
  );
}

export default BookedBox;
