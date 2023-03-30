import {API_URL} from '@env';
//let year = new Date().getFullYear();
let year = new Date().getFullYear();
let month = new Date().getMonth();

export default {
  authTokenAPI: `${API_URL}/Account/login`,
  holidaysAPI: `${API_URL}/Holiday?year=${year}`,
  leaveDetails: `${API_URL}/Leave/AppliedLeaves?empId=`,
  employeeProfileAPI: `${API_URL}/EmployeeProfile/GetEmployeeByName?name=EMP/`,
  calenderEventAPI: `${API_URL}/Event/GetCalenderEvents?month=${month + 1}`,
  attendenceAPI: `${API_URL}/Attendance/GetDailyAttendanceByEmpId?empId=`,
  getTodayMenuGet: `${API_URL}/EmployeeDashBoard/GetEmployeeDashBoard`,
  getUserFeedback: `${API_URL}/FoodRequest?dailyMenuId=`,
  giveFeedbackPost: `${API_URL}/FoodRequest/AddFeedback`,
  getAllEmployees: `${API_URL}/EmployeeProfile/GetAllEmployeeDetails`,
  getMenuFeedbackTotalCount: `${API_URL}/FoodRequest/TotalFoodResponseCount`,
  attendenceAPI: `${API_URL}/Attendance/GetDailyAttendanceByEmpId?empId=`,
  getTodayMenuGet: `${API_URL}/EmployeeDashBoard/GetEmployeeDashBoard`,
  applyLeave: `${API_URL}/Leave/AddLeave`,
};
