/**
 * Calculates the time difference between the current time and a given timestamp, and returns a string representing how long ago the timestamp was.
 *
 * @param {string} timestamp - The timestamp to compare with the current time.
 * @returns {string} A string representing how long ago the timestamp was.
 *
 * @example
 * // Returns "방금 전" if the timestamp is less than a minute ago
 * getTimeAgo("2024-07-05T12:00:00Z");
 *
 * @example
 * // Returns "5분 전" if the timestamp is 5 minutes ago
 * getTimeAgo("2024-07-05T11:55:00Z");
 *
 * @example
 * // Returns "3시간 전" if the timestamp is 3 hours ago
 * getTimeAgo("2024-07-05T09:00:00Z");
 *
 * @example
 * // Returns "2일 전" if the timestamp is 2 days ago
 * getTimeAgo("2024-07-03T12:00:00Z");
 *
 * @example
 * // Returns "1달 전" if the timestamp is 1 month ago
 * getTimeAgo("2024-06-05T12:00:00Z");
 *
 * @example
 * // Returns "1년 전" if the timestamp is 1 year ago
 * getTimeAgo("2023-07-05T12:00:00Z");
 */
export default function getTimeAgo(timestamp: string): string {
  const current = new Date();
  const previous = new Date(timestamp);
  const diff = Math.abs(current.getTime() - previous.getTime()) / 1000;

  const seconds = Math.floor(diff);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const months = Math.floor(diff / 2629800);
  const years = Math.floor(diff / 31557600);

  if (seconds < 60) {
    return '방금 전';
  }
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  if (days < 30) {
    return `${days}일 전`;
  }
  if (months < 12) {
    return `${months}달 전`;
  }
  return `${years}년 전`;
}
