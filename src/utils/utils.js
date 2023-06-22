import {days} from 'defaultData';

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
  const date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
  let monthValue =
    today.getMonth() + 1 > 9
      ? today.getMonth() + 1
      : `0${today.getMonth() + 1}`;
  return `${today.getFullYear()}-${monthValue}-${date}`;
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

export const openLeavesCount = function ({leaves}) {
  const openCount = {earnedOpen: 0, rhOpen: 0};
  if (leaves && leaves?.length) {
    for (let leaveData of leaves) {
      const {status, leaveType, totalLeaveDays} = leaveData || {};
      if (status?.toLowerCase() === 'open') {
        if (leaveType.toLowerCase() === 'earned leave') {
          openCount.earnedOpen = openCount.earnedOpen + totalLeaveDays;
        }
        if (leaveType.toLowerCase() === 'restricted holiday') {
          openCount.rhOpen = openCount.rhOpen + totalLeaveDays;
        }
      }
    }
  }
  return openCount;
};

export const lunchChargeMessage = function (amount, type) {
  return `You will be charged ₹${amount}/${
    type === 'monthly' ? 'Month' : 'Day'
  }.`;
};
