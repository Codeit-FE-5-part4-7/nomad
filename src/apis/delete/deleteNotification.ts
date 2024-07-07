import instance from '../axios';
/**
 * Deletes a notification by its ID.
 *
 * This function sends a DELETE request to the server to remove a notification
 * with the specified ID. If the deletion is successful, the function returns
 * the response data. If an error occurs, the function returns an error message.
 *
 * @param {number} id - The ID of the notification to delete.
 * @returns {Promise<void | string>} - A promise that resolves to the response data if the deletion is successful, or an error message if an error occurs.
 *
 * @example
 * // Delete a notification with ID 123
 * deleteNotifications(123)
 *   .then(data => {
 *     console.log('Notification deleted:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error deleting notification:', error);
 *   });
 */
const deleteNotifications = async (id: number): Promise<void | string> => {
  try {
    const res = await instance.delete(`/my-notifications/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
};

export default deleteNotifications;
