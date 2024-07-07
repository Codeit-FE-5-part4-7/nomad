/* eslint-disable */

/**
 * A collection of functions and constants to generate query keys for react-query.
 *
 * These keys are used to uniquely identify the cached data in react-query.
 * The functions and constants here help generate these keys based on the parameters provided.
 */
export const queryKey = {
	/**
	 * Generates a query key for fetching reservations based on activity ID, year, and month.
	 *
	 * @param {number} activitiesId - The ID of the activity.
	 * @param {number} year - The year for which to fetch reservations.
	 * @param {string} month - The month for which to fetch reservations.
	 * @returns {Array} The query key array.
	 *
	 * @example
	 * const key = queryKey.reservation(1, 2024, '07');
	 * // key => ['activities', 1, 2024, '07']
	 */
	reservation: (activitiesId: number, year: number, month: string) => ['activities', activitiesId, year, month],
  
	/**
	 * The query key for fetching user notifications.
	 *
	 * @type {Array}
	 *
	 * @example
	 * const key = queryKey.myNotifications;
	 * // key => ['myNotifications']
	 */
	myNotifications: ['myNotifications'],
  
	/**
	 * The query key for fetching user's activities.
	 *
	 * @type {Array}
	 *
	 * @example
	 * const key = queryKey.myActivities;
	 * // key => ['my-activities']
	 */
	myActivities: ['my-activities'],
  
	/**
	 * The query key for fetching user's reservations.
	 *
	 * @type {Array}
	 *
	 * @example
	 * const key = queryKey.myReservations;
	 * // key => ['my-reservations']
	 */
	myReservations: ['my-reservations'],
  
	/**
	 * Generates a query key for fetching user's reservations based on schedule ID and status.
	 *
	 * @param {number} scheduledId - The ID of the schedule.
	 * @param {string} selectedStatus - The status of the reservation ('pending', 'confirmed', 'declined').
	 * @returns {Array} The query key array.
	 *
	 * @example
	 * const key = queryKey.getMyReservationsUseTime(10, 'confirmed');
	 * // key => ['my-activities', 'reservation', 10, 'confirmed']
	 */
	getMyReservationsUseTime: (scheduledId: number, selectedStatus: string) => ['my-activities', 'reservation', scheduledId, selectedStatus],
  
	/**
	 * Generates a query key for fetching user's reservations based on a specific date.
	 *
	 * @param {string} date - The date for which to fetch reservations.
	 * @returns {Array} The query key array.
	 *
	 * @example
	 * const key = queryKey.getMyReservationUseDate('2024-07-01');
	 * // key => ['my-activities', 'reservation', '2024-07-01']
	 */
	getMyReservationUseDate: (date: string) => ['my-activities', 'reservation', date],
  
	/**
	 * Generates a query key for fetching reviews of an activity based on activity ID and page number.
	 *
	 * @param {number} id - The ID of the activity.
	 * @param {number} page - The page number of the reviews.
	 * @returns {Array} The query key array.
	 *
	 * @example
	 * const key = queryKey.getActivityReview(1, 2);
	 * // key => ['activity', 'review', 1, 2]
	 */
	getActivityReview: (id: number, page: number) => ['activity', 'review', id, page],
  };
  /* eslint-enable */
