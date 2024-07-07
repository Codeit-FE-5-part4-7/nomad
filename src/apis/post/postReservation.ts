import instance from '../axios';
/* eslint-disable */
/**
 * Creates a new reservation for a specific activity by sending a POST request with the reservation data.
 *
 * @param {number} activityId - The ID of the activity for which the reservation is being made.
 * @param {unknown} data - The reservation data to be sent in the request body.
 * @returns {Promise<any>} - A promise that resolves to the response of the POST request.
 *
 * @example
 * const reservationData = {
 *   userId: 123,
 *   date: '2024-07-15',
 *   time: '10:00',
 *   participants: 2,
 * };
 *
 * postReservation(456, reservationData)
 *   .then(response => {
 *     console.log('Reservation created:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error creating reservation:', error);
 *   });
 */
const postReservation = async (activityId: number, data: unknown): Promise<any> => {
  const res = await instance.post(`/activities/${activityId}/reservations`, data);
  return res;
};

export default postReservation;
/* eslint-enable */
