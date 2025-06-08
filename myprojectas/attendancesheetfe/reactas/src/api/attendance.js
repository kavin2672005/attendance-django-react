import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';  // note the /api prefix

const token = () => localStorage.getItem('token');

function getAuthHeaders() {
  const authToken = token();
  return {
    headers: {
      Authorization: `Token ${authToken}`
    }
  };
}

export const loginUser = (data) => axios.post(`${API_BASE}/loginuser/`, data);
export const registerUser = (data) => axios.post(`${API_BASE}/register/`, data);

export const punchIn = () => axios.post(`${API_BASE}/punch-in/`, {}, {
  headers: { Authorization: `Token ${token()}` }
});

export const punchOut = () => axios.post(`${API_BASE}/punch-out/`, {}, {
  headers: { Authorization: `Token ${token()}` }
});

export const getAttendanceHistory = () => axios.get(`${API_BASE}/attendance/`, {
  headers: { Authorization: `Token ${token()}` }
});

export const exportExcel = () =>
  axios.get(`${API_BASE}/print/`, {
    headers: { Authorization: `Token ${token()}` },
    responseType: 'blob',  // This is required to get the binary data properly
  });

export const getMonthlyReport = () => {
  return axios.get(`${API_BASE}/report/`, getAuthHeaders());
};

export const notifyMissing = () => axios.get(`${API_BASE}/notify/`, {
    headers: { Authorization: `Token ${token()}` }
});



export const adminAddUser = (data) => axios.post(`${API_BASE}/admin/add-user/`, data, {
  headers: { Authorization: `Token ${token()}` }
});

export const getAllAttendances = () => axios.get(`${API_BASE}/admin/attendances/`, {
  headers: { Authorization: `Token ${token()}` }
});

export const updateAttendance = (id, data) => axios.put(`${API_BASE}/admin/attendance/${id}/`, data, {
  headers: { Authorization: `Token ${token()}` }
});

export const getAttendanceById = (id) => axios.get(`${API_BASE}/admin/attendance/${id}/`, {
  headers: { Authorization: `Token ${token()}` }
});

