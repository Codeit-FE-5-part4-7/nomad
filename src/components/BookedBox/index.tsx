export type Reservation = {
  date: string;
  status: '예약' | '완료' | '승인';
};

type BookedBoxProps = {
  reservations: Reservation[];
  resData: {
    date: string;
    reservations: {
      completed: number;
      confirmed: number;
      pending: number;
    };
  }[];
};

const statusStyles = {
  예약: 'bg-blue text-white',
  완료: 'bg-gray-50 text-gray500',
  승인: 'bg-orange-light text-orange',
};

function BookedBox({ reservations, resData }: BookedBoxProps) {
  const getStatusCounts = (date: string) => {
    const dataForDate = resData.find((data) => data.date === date);
    if (dataForDate) {
      return {
        예약: dataForDate.reservations.pending || 0,
        완료: dataForDate.reservations.completed || 0,
        승인: dataForDate.reservations.confirmed || 0,
      };
    }
    return { 예약: 0, 완료: 0, 승인: 0 };
  };

  return (
    <div className='flex flex-col-reverse w-[100%] h-[80%] gap-[0.25rem]'>
      {reservations.map((reservation) => {
        const statusCounts = getStatusCounts(reservation.date);
        return (
          <div key={`${reservation.date}-${reservation.status}`} className={`rounded ${statusStyles[reservation.status]} text-center`}>
            {reservation.status} {statusCounts[reservation.status] > 0 ? `${statusCounts[reservation.status]}` : ''}
          </div>
        );
      })}
    </div>
  );
}

export default BookedBox;
