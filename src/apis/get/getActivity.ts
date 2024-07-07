import instance from '../axios';
/* eslint-disable */
/**
 * Fetches the details of a specific activity by its ID.
 *
 * This function sends a GET request to the server to retrieve the details of an activity
 * specified by the provided activity ID. It returns the data of the activity.
 *
 * @param {string} activityId - The ID of the activity to fetch details for.
 * @returns {Promise<any>} - A promise that resolves to the data of the activity.
 *
 * @example
 * getActivity('12345')
 *   .then(data => {
 *     console.log('Activity details:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching activity details:', error);
 *   });
 */
const getActivity = async (activityId: string): Promise<any> => {
  const res = await instance.get(`/activities/${activityId}`);
  return res.data;
};

export default getActivity;
/* eslint-enable */
