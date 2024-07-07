import instance from '../axios';
/* eslint-disable */
/**
 * Uploads an image for an activity by sending a POST request with form data.
 *
 * @param {FormData} postData - The form data containing the image file to be uploaded.
 * @returns {Promise<any>} - A promise that resolves to the response of the POST request.
 *
 * @example
 * const formData = new FormData();
 * formData.append('image', imageFile);
 *
 * postActivityImageUrl(formData)
 *   .then(response => {
 *     console.log('Image uploaded:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error uploading image:', error);
 *   });
 */
const postActivityImageUrl = async (postData: FormData): Promise<any> => {
  const res = await instance.post('/activities/image', postData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res;
};

export default postActivityImageUrl;
/* eslint-enable */
