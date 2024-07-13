import instance from '../axios';

const deleteActivity = async (id: number): Promise<void | string> => {
  try {
    const res = await instance.delete(`/my-activities/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
};

export default deleteActivity;
