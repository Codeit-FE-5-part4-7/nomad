import instance from '../axios';
/* eslint-disable */
/**
 * Updates the status of a reservation for a specific activity using a PATCH request.
 *
 * @param {number} activityId - The ID of the activity that the reservation belongs to.
 * @param {number} reservationId - The ID of the reservation to update.
 * @param {unknown} data - The data to update the reservation status with. The exact structure of the data depends on the API.
 * @returns {Promise<any>} - A promise that resolves to the response of the PATCH request.
 *
 * @example
 * patchReservationStatus(123, 456, { status: 'confirmed' })
 *   .then(response => {
 *     console.log('Reservation status updated:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error updating reservation status:', error);
 *   });
 */
const patchReservationStatus = async (activityId: number, reservationId: number, data: unknown): Promise<any> => {
  const res = await instance.patch(`/my-activities/${activityId}/reservations/${reservationId}`, data);
  return res;
};

export default patchReservationStatus;
/* eslint-enable */
