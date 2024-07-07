import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Props interface for the custom infinite query hook.
 * @interface
 * @property {(string | number | object)[]} queryKey - Unique key for the query.
 * @property {Function} queryFn - Function to fetch the query data. It receives an object with a `pageParam` property.
 */
interface Props {
  queryKey: (string | number | object)[];
  queryFn: ({ pageParam }: { pageParam: number | undefined }) => { cursorId: number | undefined } & any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Custom hook for infinite queries using React Query.
 *
 * This hook is a wrapper around the `useInfiniteQuery` hook from React Query.
 * It handles infinite scrolling by fetching the next page of data based on the cursor ID.
 * The hook flattens the pages of data into a single array and extracts the total count from the first page.
 *
 * @param {Props} props - The properties for the custom infinite query.
 * @param {(string | number | object)[]} props.queryKey - Unique key for the query.
 * @param {Function} props.queryFn - Function to fetch the query data. It receives an object with a `pageParam` property.
 *
 * @returns {UseInfiniteQueryResult} The result of the infinite query, including the data, error, status, and more.
 */
const useCustomInfiniteQuery = ({ queryKey, queryFn }: Props) =>
  useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.cursorId,
    select: (data) => ({
      pages: data?.pages.flatMap((page) => page.reservations || page.activities || page.reservation || page.notifications),
      totalCount: data?.pages[0].totalCount,
    }),
  });

export default useCustomInfiniteQuery;
