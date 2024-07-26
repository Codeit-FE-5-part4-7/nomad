import instance from '../axios';

/* eslint-disable */
interface IMyReservation {
  cursorId?: number;
  size?: number;
  filterOption?: string;
}

const getMyReservationList = async ({ filterOption, cursorId, size = 6 }: IMyReservation) => {
  try {
    const params: Partial<{ cursorId: number; size: number; status?: string }> = { size, cursorId };

    if (filterOption) {
      params.status = filterOption;
    }

    const { data } = await instance.get(`/my-reservations`, {
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getMyReservationList;
/* eslint-enable */
