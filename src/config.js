import {API_URL} from '@env';
//let year = new Date().getFullYear();
let year = 2021;
console.log('year:-------------------------', year);
export default {
  authTokenAPI: `${API_URL}/Account/login`,
  holidaysAPI: `${API_URL}/Holiday?year=${year}`,
  employeeProfileAPI: `${API_URL}/EmployeeProfile/GetEmployeeByName?name=EMP/`,
};
