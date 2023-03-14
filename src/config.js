import {API_URL} from '@env';
//let year = new Date().getFullYear();
let year = 2021;
let month = new Date().getMonth();

console.log('month:------------------', month);

export default {
  authTokenAPI: `${API_URL}/Account/login`,
  holidaysAPI: `${API_URL}/Holiday?year=${year}`,
  leaveDetails: `${API_URL}/Leave/AppliedLeaves?empId=`,
  employeeProfileAPI: `${API_URL}/EmployeeProfile/GetEmployeeByName?name=EMP/`,
  calenderEventAPI: `${API_URL}/Event/GetCalenderEvents?month=${month + 1}`,
  attendenceAPI: `${API_URL}Attendance/GetDailyAttendanceByEmpId?empId=`,
};
