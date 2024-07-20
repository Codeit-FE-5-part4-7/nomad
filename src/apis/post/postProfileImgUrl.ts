import instance from '@/apis/axios';

const postProfileImgUrl = async (imgData: FormData) => {
  try {
    const response = await instance.post(`users/me/image`, imgData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response;
  } catch (error: any) {
    // eslint-disable-next-line no-alert
    alert(error.response.data.message);
    return null;
  }
};

export default postProfileImgUrl;
