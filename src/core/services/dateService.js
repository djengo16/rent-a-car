export function formatDate(date) {
  const year = date.getFullYear();
  const month =
    date.getMonth().toString().length === 1
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
  const day =
    date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
  const hours =
    date.getHours().toString().length === 1
      ? `0${date.getHours()}`
      : date.getHours();
  const minutes =
    date.getMinutes().toString().length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
/**
 * this function checks if the given date is
 * included in the last n days
 * @param {*} date => date
 * @param {*} days => last days
 * @returns true if date is included in last n days
 */
export function isDateInTheLast(date, days) {
  const today = new Date();

  const daysFromRent = calculateDays(date, today);
  return daysFromRent <= days;
}

export function calculateDays(start, end) {
  let totalTime = end.getTime() - start.getTime();
  return Math.round(totalTime / (1000 * 3600 * 24));
}
