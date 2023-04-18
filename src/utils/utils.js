import moment from 'moment';
import {days} from 'defaultData';

export const isBefore2021 = (date1, date2, year, holidayDate) => {
  const Month = +moment(holidayDate).format(' MM ');

  return date1 < date2 && Month >= 4 && year <= 2021;
};

export const attendanceDate = val => {
  let today = new Date();
  let dayOfWeek = today.getDay();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayOfWeek + val,
  );
};
export const startEndDateFormat = date => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
export const todaySelectedDate = () => {
  let today = new Date();
  let monthValue =
    today.getMonth() + 1 > 9
      ? today.getMonth() + 1
      : `0${today.getMonth() + 1}`;
  return `${today.getFullYear()}-${monthValue}-${today.getDate()}`;
};
export const finalCurrentDate = () => {
  const date = new Date();
  const presentDate = String(date.getDate()).padStart(2, '0');
  const presentMonth = date.toLocaleString('default', {month: 'long'});
  const currentDayIndex = date.getDay();
  const currentDay = days[currentDayIndex];
  const finalTodayDate = `${presentDate}, ${presentMonth}`;
  return {currentDay, finalTodayDate};
};
