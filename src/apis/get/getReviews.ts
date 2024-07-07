import instance from '../axios';
/* eslint-disable */
/**
 * Fetches reviews for a specific activity with pagination support.
 *
 * @param {number} activityId - The ID of the activity for which to fetch reviews.
 * @param {number} [page=1] - The page number to fetch. Defaults to 1 if not specified.
 * @param {number} [size=3] - The number of reviews to fetch per page. Defaults to 3 if not specified.
 * @returns {Promise<any>} - A promise that resolves to the reviews data.
 *
 * @example
 * getReviews(123, 2, 5)
 *   .then(data => {
 *     console.log('Reviews:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching reviews:', error);
 *   });
 */
const getReviews = async (activityId: number, page = 1, size = 3): Promise<any> => {
  const res = await instance.get(`/activities/${activityId}/reviews`, { params: { page, size } });

  return res.data;
};

export default getReviews;
/* eslint-enable */
