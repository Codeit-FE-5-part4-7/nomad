import instance from '@/apis/axios';
/* eslint-disable */
/**
 * Fetches the list of available schedules for a given activity, year, and month.
 *
 * @param {number} activityId - The ID of the activity.
 * @param {number} year - The year for which available schedules are to be fetched.
 * @param {string} month - The month for which available schedules are to be fetched.
 * @returns {Promise<any>} - A promise that resolves to the data of available schedules.
 *
 * @example
 * getAbledResrvationList(152, 2023, '07')
 *   .then(data => {
 *     console.log('Available schedules:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching available schedules:', error);
 *   });
 */
export async function getAbledResrvationList(activityId: number, year: number, month: string): Promise<any> {
  const res = await instance.get(`/activities/${activityId}/available-schedule`, { params: { year, month } });
  return res.data;
}

getAbledResrvationList.defaultProps = {
  activityId: 152,
};

/**
 * Fetches the reservation dashboard data for a specific activity for the given year and month.
 *
 * @param {number} activityId - The ID of the activity.
 * @param {number} year - The year for which the reservation dashboard data is to be fetched.
 * @param {string} month - The month for which the reservation dashboard data is to be fetched.
 * @returns {Promise<any>} - A promise that resolves to the reservation dashboard data.
 *
 * @example
 * getMyActivityReservationThisMonth(178, 2023, '07')
 *   .then(data => {
 *     console.log('Reservation dashboard data:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching reservation dashboard data:', error);
 *   });
 */
export const getMyActivityReservationThisMonth = async (activityId: number, year: number, month: string): Promise<any> => {
  try {
    const res = await instance.get(`/my-activities/${activityId}/reservation-dashboard/`, { params: { year, month } });
    return res.data;
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
    return 'An unknown error occurred';
  }
};

/**
 * Fetches the reserved schedules for a specific activity and date.
 *
 * @param {number} activityId - The ID of the activity.
 * @param {string} date - The date for which reserved schedules are to be fetched.
 * @returns {Promise<any>} - A promise that resolves to the reserved schedules data.
 *
 * @example
 * getReservedScheduleDate(178, '2023-07-20')
 *   .then(data => {
 *     console.log('Reserved schedules:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching reserved schedules:', error);
 *   });
 */
export const getReservedScheduleDate = async (activityId: number, date: string): Promise<any> => {
  const res = await instance.get(`/my-activities/${activityId}/reserved-schedule`, { params: { date } });
  const { data } = res;
  return data;
};

/**
 * Fetches the reservation data for a specific activity, schedule, and status.
 *
 * @param {number} activityId - The ID of the activity.
 * @param {number} scheduleId - The ID of the schedule.
 * @param {'declined' | 'confirmed' | 'pending'} status - The status of the reservations to be fetched.
 * @param {Object} params - The parameters for pagination.
 * @param {number} params.pageParam - The cursor ID for pagination.
 * @param {number} [params.size=10] - The number of reservations to fetch per page.
 * @returns {Promise<any>} - A promise that resolves to the reservation data.
 *
 * @example
 * getMyActivitiesReservation(178, 1, 'confirmed', { pageParam: 2 })
 *   .then(data => {
 *     console.log('Reservations:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching reservations:', error);
 *   });
 */
export const getMyActivitiesReservation = async (activityId: number, scheduleId: number, status: 'declined' | 'confirmed' | 'pending', size = 10, { pageParam }: { pageParam: number | undefined }) => {
  try {
    const res = await instance.get(`/my-activities/${activityId}/reservations`, {
      params: { size, scheduleId, status, cursorId: pageParam ? pageParam : null },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Fetches the user's reservations with a specified page size.
 *
 * @param {number} size - The number of reservations to fetch per page.
 * @returns {Promise<any>} - A promise that resolves to the user's reservations data.
 *
 * @example
 * getMyReserVations(10)
 *   .then(data => {
 *     console.log('My reservations:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching my reservations:', error);
 *   });
 */
export const getMyReserVations = async (size: number): Promise<any> => {
  const res = await instance.get(`/my-reservations`, { params: { size } });
  return res.data;
};
/* eslint-enable */
