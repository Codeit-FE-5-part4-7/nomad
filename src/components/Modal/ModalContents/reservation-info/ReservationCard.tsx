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
}

interface Props extends ReservationStatusProps {
  nickname: string;
  headCount: number;
  status: ReservationStatusProps['selectedStatus'];
}

/**
 * Handles the reservation status update functionality.
 * 
 * This component manages the state and mutation for updating reservation statuses.
 * Depending on the selected status, it provides different buttons for confirming or declining reservations.
 * 
 * @param {ReservationStatusProps} props - The props for the ReservationStatus component.
 * @param {'pending' | 'declined' | 'confirmed'} props.selectedStatus - The current status of the reservation.
 * @param {number} props.reservationId - The ID of the reservation.
 * @param {number} props.activityId - The ID of the activity.
 * @param {Function} [props.onClickCloseModal] - Optional function to close the modal.
 * 
 * @returns {JSX.Element} The rendered ReservationStatus component.
 */
function ReservationStatus({ selectedStatus, reservationId, activityId, onClickCloseModal }: ReservationStatusProps) {
  const queryClient = useQueryClient();

  const patchStatusMutation = useMutation({
    mutationFn: (data: { status: ReservationStatusProps['selectedStatus'] }) => patchReservationStatus(activityId, reservationId, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(reservationId, selectedStatus) });
      queryClient.invalidateQueries({ queryKey: [`/my-activities/${activityId}`] });
      onClickCloseModal && onClickCloseModal();
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
      return (
        <>
          {/* Button to confirm the reservation */}
          {/* <button size='sm' onClick={handleClickConfirmed} text='확정하기' /> */}
          {/* Button to decline the reservation */}
          {/* <button size='sm' onClick={handleClickDeclined} variant='outline' text='거절하기' /> */}
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

/**
 * Renders a reservation card with details and status update options.
 * 
 * This component displays the reservation details such as nickname and headcount.
 * Depending on the reservation status, it provides options to confirm or decline the reservation.
 * 
 * @param {Props} props - The props for the ReservationCard component.
 * @param {string} props.nickname - The nickname of the person who made the reservation.
 * @param {number} props.headCount - The number of people included in the reservation.
 * @param {'pending' | 'declined' | 'confirmed'} props.status - The status of the reservation.
 * @param {number} props.reservationId - The ID of the reservation.
 * @param {number} props.activityId - The ID of the activity.
 * @param {Function} [props.onClickCloseModal] - Optional function to close the modal.
 * 
 * @returns {JSX.Element} The rendered ReservationCard component.
 */
export default function ReservationCard({ selectedStatus, nickname, headCount, status, reservationId, activityId, onClickCloseModal }: Props) {
  if (status === selectedStatus) {
    return (
      <li className='flex flex-col justify-between items-stretch rounded-md border border-gray-300 p-6 w-[38.2rem] h-[11.6rem]'>
        <p className='flex items-start gap-4 text-lg font-medium text-gray-600'>
          닉네임<span className='text-black'>{nickname}</span>
        </p>
        <p className='flex items-start gap-4 text-lg font-medium text-gray-600'>
          인원<span className='text-black'>{headCount}명</span>
        </p>
        <div className='flex justify-end items-end gap-2.5'>
          <ReservationStatus onClickCloseModal={onClickCloseModal} activityId={activityId} reservationId={reservationId} selectedStatus={selectedStatus} />
        </div>
      </li>
    );
  }
  return <li className='flex flex-col justify-between items-stretch rounded-md border border-gray-300 p-6 w-[38.2rem] h-[11.6rem]'>해당하는 예약 내역이 없습니다</li>;
}
/* eslint-enable */
