import { useMutation, useQueryClient } from '@tanstack/react-query';
import patchReservationStatus from '@/apis/patch/patchReservationStatus';
import ReservationTag from '@/components/ReservationTag';
import { queryKey } from '@/apis/queryKey';
/* eslint-disable */
interface ReservationStatusProps {
  selectedStatus: 'pending' | 'declined' | 'confirmed';
  reservationId: number;
  activityId: number;
  onClickCloseModal?: () => void;
  onStatusChange?: () => void; // 새로운 콜백 prop 추가
  date: string; // 추가
  scheduledId: number; // 추가
}

interface Props extends ReservationStatusProps {
  nickname: string;
  headCount: number;
  status: ReservationStatusProps['selectedStatus'];
}

function ReservationStatus({ selectedStatus, reservationId, activityId, onClickCloseModal, onStatusChange, date, scheduledId }: ReservationStatusProps) {
  const queryClient = useQueryClient();
  const patchStatusMutation = useMutation({
    mutationFn: (data: { status: ReservationStatusProps['selectedStatus'] }) => patchReservationStatus(activityId, reservationId, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(reservationId, selectedStatus) });
      queryClient.invalidateQueries({ queryKey: [`/my-activities/${activityId}`] });

      // ReservationInfo 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationUseDate(date) });
      queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(scheduledId, selectedStatus) });

      // Invalidate the calendar-related queries
      queryClient.invalidateQueries({ queryKey: ['reservations', activityId] });
      onClickCloseModal && onClickCloseModal();
      onStatusChange && onStatusChange(); // 상태 변경 시 콜백 호출
    },
  });

  const handleClickConfirmed = () => {
    patchStatusMutation.mutate({ status: 'confirmed' });
  };

  const handleClickDeclined = () => {
    patchStatusMutation.mutate({ status: 'declined' });
  };

  switch (selectedStatus) {
    case 'pending':
      console.log(selectedStatus);
      return (
        <>
          <button onClick={handleClickConfirmed} className='w-[8.2rem] h-[3.8rem] rounded-[0.6rem] bg-nomad-black text-white'>
            승인하기
          </button>
          <button onClick={handleClickDeclined} className='w-[8.2rem] h-[3.8rem] rounded-[0.6rem] text-nomad-black border-[0.1rem] border-nomad-black'>
            거절하기
          </button>
        </>
      );
    case 'declined':
      return <ReservationTag status='declined' />;
    case 'confirmed':
      return <ReservationTag status='confirmed' />;
    default:
      return null;
  }
}

export default function ReservationCard({ selectedStatus, nickname, headCount, status, reservationId, activityId, onClickCloseModal, date, scheduledId }: Props) {
  if (status === selectedStatus) {
    console.log(selectedStatus);
    return (
      <li className='flex flex-col justify-between items-stretch rounded-md border border-gray-50 p-6 w-full h-[11.6rem]'>
        <p className='flex items-start gap-4 text-lg font-medium text-gray-600 text-[1.6rem]'>
          닉네임<span className='text-black'>{nickname}</span>
        </p>
        <p className='flex items-start gap-4 text-lg font-medium text-gray-600 text-[1.6rem]'>
          인원<span className='text-black'>{headCount}명</span>
        </p>
        <div className='flex justify-end items-end gap-2.5'>
          <ReservationStatus onClickCloseModal={onClickCloseModal} activityId={activityId} reservationId={reservationId} selectedStatus={selectedStatus} date={date} scheduledId={scheduledId} />
        </div>
      </li>
    );
  }
  return <li className='flex flex-col justify-between items-stretch rounded-md border border-gray-300 p-6 w-[38.2rem] h-[11.6rem]'>해당하는 예약 내역이 없습니다</li>;
}
/* eslint-enable */
