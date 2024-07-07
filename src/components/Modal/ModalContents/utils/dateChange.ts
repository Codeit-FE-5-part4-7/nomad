/* eslint-disable */

/**
 * Formats a given date to 'YYYY-MM-DD' format.
 *
 * @param {Date | string} dateString - The date to be formatted.
 * @returns {string | undefined} The formatted date string or undefined if input is invalid.
 */
export function postformatDate(dateString: Date | string): string | undefined {
	if (dateString === undefined) return;
  
	const date = new Date(dateString);
  
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
  
	return `${year}-${month}-${day}`;
  }
  
  /**
   * Converts a given date to a formatted string in 'YYYY년 MM월 DD일' format.
   *
   * @param {Date | string} dateString - The date to be converted.
   * @returns {string} The date formatted as 'YYYY년 MM월 DD일'.
   */
  export function changeDateToStringFormat(dateString: Date | string): string {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
  
	const formattedDate = `${year}년 ${month < 10 ? `0${month}` : month}월 ${day < 10 ? `0${day}` : day}일`;
  
	return formattedDate;
  }
  
  /**
   * Formats a given date to 'YYYY/MM/DD' format.
   *
   * @param {Date | string} dateString - The date to be formatted.
   * @returns {string | undefined} The formatted date string or undefined if input is invalid.
   */
  export function displayDateFormat(dateString: Date | string): string | undefined {
	if (dateString === undefined) return;
  
	const date = new Date(dateString);
  
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
  
	return `${year}/${month}/${day}`;
  }
  
  /* eslint-enable */
