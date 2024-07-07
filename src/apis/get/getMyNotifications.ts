import instance from '../axios';
/* eslint-disable */
/**
 * Fetches the user's notifications with pagination support.
 *
 * @param {Object} params - The parameters for fetching notifications.
 * @param {number | undefined} params.pageParam - The cursor ID for pagination.
 * @param {number} size - The number of notifications to fetch per page.
 * @returns {Promise<any>} - A promise that resolves to the user's notifications data.
 *
 * @example
 * getMyNotifications({ pageParam: 2 }, 10)
 *   .then(data => {
 *     console.log('Notifications:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching notifications:', error);
 *   });
 */
const getMyNotifications = async ({ pageParam }: { pageParam: number | undefined }, size: number): Promise<any> => {
  const res = await instance.get(`/my-notifications`, {
    params: { cursorId: pageParam || null, size },
  });

  return res.data;
};

export default getMyNotifications;
/* eslint-enable */
