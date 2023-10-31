import {renewToken} from 'Auth/LoginSlice';
import axios from 'axios';
import {ERROR} from 'constants/strings';
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
        if (leaveType?.toLowerCase() === 'earned leave') {
          openCount.earnedOpen = openCount.earnedOpen + totalLeaveDays;
        }
        if (leaveType?.toLowerCase() === 'restricted holiday') {
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

export const centralizeApi = ({
  method = '',
  url,
  data,
  token,
  sendResp,
  refreshToken,
  dispatch,
}) => {
  let config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  if (method.toLocaleLowerCase() === 'post') {
    config = {
      ...config,
      data,
    };
  } else if (method.toLocaleLowerCase() === 'get') {
    config = {
      ...config,
    };
  }
  return axios(config)
    .then(async response => {
      const {resp, status} = response;
      if (status === 200) {
        if (sendResp) {
          return Promise.resolve(resp);
        }
        return Promise.resolve(resp);
      } else {
        return Promise.reject(new Error(ERROR));
      }
    })
    .catch(err => {
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.toLowerCase() === 'token-expired') {
        dispatch(renewToken({token: refreshToken}));
        return Promise.reject(errorMessage);
      } else {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401 || err?.response) {
          let message =
            err?.response?.data?.message ||
            err?.response?.data?.Message ||
            err?.response?.data?.title;
          return Promise.reject(message);
        } else {
          return Promise.reject(new Error(err));
        }
      }
    });
};

export const empFullName = (employee = {}) => {
  return `${employee?.firstName ? employee?.firstName + ' ' : ''}${
    employee?.middleName ? employee?.middleName + ' ' : ''
  }${employee?.lastName ? employee?.lastName + ' ' : ''}`;
};

export const getDateStringFromDateObject = date => {
  const day = date.getDate();
  const month = date.toLocaleString('default', {month: 'short'});
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getDaysBetweenDates = (date1, date2) => {
  const timeDifference = date2.getTime() - date1.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return Math.abs(Math.round(daysDifference));
};

export const getCurrentFiscalYear = () => {
  let currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  let fiscalYear = `${currentYear}-${new Date().getFullYear() + 1}`;

  if (currentMonth < 3) {
    fiscalYear = `${currentYear - 1} - ${new Date().getFullYear()}`;
  }
  return fiscalYear;
};
