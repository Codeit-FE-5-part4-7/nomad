import instance from '../axios';

const patchCancelMyReservation = async (reservationId: number) => {
  const res = await instance.patch(`/my-reservations/${reservationId}`, { status: 'canceled' });
  return res;
};

export default patchCancelMyReservation;
