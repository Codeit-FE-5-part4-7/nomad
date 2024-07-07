interface ReservationProps {
  status: 'declined' | 'confirmed';
}

export default function ReservationTag({ status }: ReservationProps) {
  const statusText = status === 'confirmed' ? '확정' : '거절';
  const baseClasses = 'inline-flex justify-center items-center text-[1.4rem] font-bold text-center px-4 py-2 rounded-full';
  const statusClasses = status === 'confirmed' ? 'text-orange-500 bg-orange-100' : 'text-red-500 bg-red-100';

  return <div className={`${baseClasses} ${statusClasses}`}>예약 {statusText}</div>;
}
