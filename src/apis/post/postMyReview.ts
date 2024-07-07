import instance from '@/apis/axios';
/* eslint-disable */

/**
 * Submits a review for a specific activity by sending a POST request with the review data.
 *
 * @param {number} activityId - The ID of the activity for which the review is being submitted.
 * @param {unknown} reviewData - The review data to be sent in the request body.
 * @returns {Promise<void>} - A promise that resolves when the review is successfully submitted.
 * @throws Will throw an error if the request fails.
 *
 * @example
 * const reviewData = {
 *   rating: 5,
 *   comment: 'Great experience!',
 * };
 * 
 * postMyReview(456, reviewData)
 *   .then(() => {
 *     console.log('Review submitted successfully');
 *   })
 *   .catch(error => {
 *     console.error('Error submitting review:', error);
 *   });
 */
const postMyReview = async (activityId: number, reviewData: unknown): Promise<void> => {
  try {
    await instance.post(`my-reservations/${activityId}/reviews`, reviewData);
  } catch (error: any) {
    // eslint-disable-next-line no-alert
    alert(error.response.data.message);
  }
};

export default postMyReview;
/* eslint-enable */
