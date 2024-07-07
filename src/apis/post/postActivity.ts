import instance from '../axios';
/* eslint-disable */
interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
}

/**
 * Sends a POST request to create a new activity.
 *
 * @param {unknown} data - The data to create the new activity with. The exact structure of the data depends on the API.
 * @returns {Promise<any>} - A promise that resolves to the response of the POST request.
 * @throws {ErrorResponse} - Throws an error if the request fails, displaying an alert with the error message.
 *
 * @example
 * postActivity({ name: 'New Activity', description: 'Activity Description' })
 *   .then(response => {
 *     console.log('Activity created:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error creating activity:', error);
 *   });
 */
const postActivity = async (data: unknown): Promise<any> => {
  try {
    const res = await instance.post('/activities', data);
    return res;
  } catch (error: unknown) {
    const err = error as ErrorResponse;
    if (err.response?.data.message) {
      // eslint-disable-next-line no-alert
      return alert(err.response.data.message);
    }
    // eslint-disable-next-line no-alert
    return alert('An unknown error occurred');
  }
};

export default postActivity;
/* eslint-enable */
