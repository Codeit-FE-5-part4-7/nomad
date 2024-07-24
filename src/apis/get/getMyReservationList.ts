import instance from '../axios';

/* eslint-disable */
interface IMyReservation {
  cursorId?: number;
  size?: number;
  filterOption?: string;
}

const getMyReservationList = async ({ filterOption, cursorId, size = 6 }: IMyReservation) => {
  try {
    console.log('filterOption ::', filterOption);
    const { data } = await instance.get(`/my-reservations`, {
      params: { size, cursorId, status: filterOption },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getMyReservationList;
/* eslint-enable */
