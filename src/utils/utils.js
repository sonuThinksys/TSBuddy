import moment from 'moment';

export const isBefore2021 = (date1, date2, year, holidayDate) => {
  const Month = +moment(holidayDate).format(' MM ');

  return date1 < date2 && Month >= 4 && year <= 2021;
};
