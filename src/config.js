import {API_URL} from '@env';
//let year = new Date().getFullYear();
let year = 2021;
export default {
  authTokenAPI: `${API_URL}/Account/login`,
  holidaysAPI: `${API_URL}/Holiday?year=${year}`,
  leaveDetails: `http://10.101.23.48:81/api/Leave/AppliedLeaves?empId=10843`,
};
