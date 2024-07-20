import instance from '../axios';

const getReservationDashBoard = async (activityId: number, year: string, month: string): Promise<any> => {
  const res = await instance.get(`/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`);
  return res.data;
};

export default getReservationDashBoard;
