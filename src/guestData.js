const guestLeavesData = [
  {fromDate: '2024-03-08T00:00:00', totalLeaveDays: 4},
  {fromDate: '2024-03-10T00:00:00', totalLeaveDays: 4.5},
  {fromDate: '2024-03-13T00:00:00', totalLeaveDays: 5},
];

const guestProfileData = {
  cellNumber: '9710000242',
  companyEmail: 'pant.amit@thinksys.com',
  dateOfJoining: '2018-01-30T00:00:00',
  designation: 'Associate Project Lead',
  employeeName: 'Amit Kumar Pant',
  image: '/files/Amit Kumar Pant (10352) ) O+.jpg',
  managerInfoDto: {
    cellNumber: '9970000837',
    companyEmail: 'sharma.mayank@thinksys.com',
    employeeName: 'Mayank Sharma',
    image: '',
  },
  montlyLunchSubscription: null,
  name: 'EMP/10352',
};

const guestHolidaysData = [
  {
    description: 'Republic Day',
    holidayDate: '2021-01-26T00:00:00',
    isRestricted: false,
  },
  {
    description: 'Holi',
    holidayDate: '2021-03-29T00:00:00',
    isRestricted: false,
  },
  {
    description: 'Diwali',
    holidayDate: '2021-11-04T00:00:00',
    isRestricted: false,
  },
  {
    description: "Mahatma Gandhi's Birthday",
    holidayDate: '2021-10-02T00:00:00',
    isRestricted: false,
  },
  {
    description: 'Dussehra',
    holidayDate: '2021-10-15T00:00:00',
    isRestricted: false,
  },
  {
    description: 'Independence Day',
    holidayDate: '2021-08-15T00:00:00',
    isRestricted: false,
  },
];

const guestLeavesScreenData = [
  {
    currentLeaveBalance: 1.75,
    description: 'testing',
    employeeName: 'Amit Kumar Pant',
    fiscalYear: '2022-2023',
    fromDate: '2023-03-08T00:00:00',
    leaveApplicationId: 'LEAPP/000003',
    leaveType: 'Earned Leave',
    managerInfoDto: {
      cellNumber: null,
      companyEmail: null,
      employeeName: 'Mayank Sharma',
      image: null,
    },
    postingDate: '2023-03-07T00:00:00',
    status: 'Open',
    toDate: '2023-03-08T00:00:00',
    totalLeaveDays: 1,
  },
  {
    currentLeaveBalance: 1.75,
    description: 'test',
    employeeName: 'Amit Kumar Pant',
    fiscalYear: '2022-2023',
    fromDate: '2023-03-10T00:00:00',
    leaveApplicationId: 'LEAPP/000004',
    leaveType: 'Earned Leave',
    managerInfoDto: {
      cellNumber: null,
      companyEmail: null,
      employeeName: 'Mayank Sharma',
      image: null,
    },
    postingDate: '2023-03-07T00:00:00',
    status: 'Open',
    toDate: '2023-03-10T00:00:00',
    totalLeaveDays: 0.5,
  },
  {
    currentLeaveBalance: 1.75,
    description: 'test',
    employeeName: 'Amit Kumar Pant',
    fiscalYear: '2022-2023',
    fromDate: '2023-03-13T00:00:00',
    leaveApplicationId: 'LEAPP/000005',
    leaveType: 'Earned Leave',
    managerInfoDto: {
      cellNumber: null,
      companyEmail: null,
      employeeName: 'Mayank Sharma',
      image: null,
    },
    postingDate: '2023-03-12T00:00:00',
    status: 'Open',
    toDate: '2023-03-13T00:00:00',
    totalLeaveDays: 1,
  },
];

export {
  guestLeavesData,
  guestProfileData,
  guestLeavesScreenData,
  guestHolidaysData,
};
