import instance from '../axios';
/* eslint-disable */
/**
 * Updates an activity with the given data using a PATCH request.
 *
 * @param {string | string[] | undefined} activityId - The ID of the activity to update. This can be a string or an array of strings or undefined.
 * @param {unknown} data - The data to update the activity with. The exact structure of the data depends on the API.
 * @returns {Promise<any>} - A promise that resolves to the response of the PATCH request.
 *
 * @example
 * patchActivity('123', { name: 'New Activity Name' })
 *   .then(response => {
 *     console.log('Activity updated:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error updating activity:', error);
 *   });
 */
const patchActivity = async (activityId: string | string[] | undefined, data: unknown): Promise<any> => {
  try {
    const res = await instance.patch(`/my-activities/${activityId}`, data);

    return res;
  } catch (error) {
    return console.log(error); // eslint-disable-line no-console
  }
};

export default patchActivity;
/* eslint-enable */
