import { GetActivitiesList } from '@/utils/types/activities';
import instance from '../axios';

interface GetActivitiesType {
  totalCount: number;
  activities: GetActivitiesList[];
}

/**
 * Fetches the list of most reviewed popular activities.
 *
 * This function sends a GET request to the server to retrieve a list of activities
 * sorted by the number of reviews. It returns the first 10 activities.
 *
 * @returns {Promise<GetActivitiesType>} - A promise that resolves to an object containing the total count and an array of popular activities.
 *
 * @example
 * getPopularActivities()
 *   .then(data => {
 *     console.log('Popular activities:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching popular activities:', error);
 *   });
 */
export const getPopularActivities = async (): Promise<GetActivitiesType> => {
  const { data } = await instance.get<GetActivitiesType>('/activities', {
    params: {
      method: 'offset',
      sort: 'most_reviewed',
      size: 10,
    },
  });
  return data;
};

/**
 * Fetches a list of activities with optional category and filter parameters.
 *
 * This function sends a GET request to the server to retrieve a list of activities
 * based on the provided pagination, category, and filter options.
 *
 * @param {Object} params - The parameters for fetching activities.
 * @param {number} params.currentPage - The current page number for pagination.
 * @param {number} params.currentSize - The number of activities to fetch per page.
 * @param {string} [params.category] - The category to filter activities by.
 * @param {string} [params.filter] - The filter to sort activities by.
 * @returns {Promise<GetActivitiesType>} - A promise that resolves to an object containing the total count and an array of activities.
 *
 * @example
 * getActivities({ currentPage: 1, currentSize: 10, category: 'sports', filter: 'recent' })
 *   .then(data => {
 *     console.log('Activities:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching activities:', error);
 *   });
 */
export const getActivities = async ({
  currentPage,
  currentSize,
  category = '',
  filter = '',
}: {
  currentPage: number;
  currentSize: number;
  category: string;
  filter: string;
}): Promise<GetActivitiesType> => {
  const params: {
    method: string;
    page: number;
    size: number;
    category?: string;
    sort?: string;
  } = {
    method: 'offset',
    page: currentPage,
    size: currentSize,
  };

  if (category) {
    params.category = category;
  }

  if (filter) {
    params.sort = filter;
  }

  const { data } = await instance.get<GetActivitiesType>('/activities', { params });
  return data;
};

/**
 * Searches for activities based on a keyword.
 *
 * This function sends a GET request to the server to search for activities
 * that match the provided keyword. It uses pagination parameters to limit the results.
 *
 * @param {Object} params - The parameters for searching activities.
 * @param {number} params.currentPage - The current page number for pagination.
 * @param {number} params.currentSize - The number of activities to fetch per page.
 * @param {string} params.keyword - The keyword to search activities by.
 * @returns {Promise<GetActivitiesType>} - A promise that resolves to an object containing the total count and an array of activities matching the keyword.
 *
 * @example
 * getSearchActivities({ currentPage: 1, currentSize: 10, keyword: 'yoga' })
 *   .then(data => {
 *     console.log('Search results:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error searching activities:', error);
 *   });
 */
export const getSearchActivities = async ({ currentPage, currentSize, keyword }: { currentPage: number; currentSize: number; keyword: string }): Promise<GetActivitiesType> => {
  const params: {
    method: string;
    page: number;
    size: number;
    keyword?: string;
  } = {
    method: 'offset',
    page: currentPage,
    size: currentSize,
  };

  if (keyword) {
    params.keyword = keyword;
  }

  const { data } = await instance.get<GetActivitiesType>('/activities', { params });
  return data;
};
