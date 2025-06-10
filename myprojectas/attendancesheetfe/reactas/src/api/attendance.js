import axios from 'axios';

// Dynamically use local backend in development, and Render backend in production
const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api';

const token = () => localStorage.getItem('token');

function getAuthHeaders() {
  return {
    headers: {
      Authorization: `Token ${token()}`
    }
  };
}

// Authentication
export const loginUser = (data) => axios.post(`${API_BASE}/loginuser/`, data);
export const registerUser = (data) => axios.post(`${API_BASE}/register/`, data);

// Attendance
export const punchIn = () => axios.post(`${API_BASE}/punch-in/`, {}, getAuthHeaders());
export const punchOut = () => axios.post(`${API_BASE}/punch-out/`, {}, getAuthHeaders());
export const getAttendanceHistory = () => axios.get(`${API_BASE}/attendance/`, getAuthHeaders());
export const exportExcel = () => axios.get(`${API_BASE}/print/`, {
  ...getAuthHeaders(),
  responseType: 'blob',
});
export const getMonthlyReport = () => axios.get(`${API_BASE}/report/`, getAuthHeaders());
export const notifyMissing = () => axios.get(`${API_BASE}/notify/`, getAuthHeaders());

// Admin
export const adminAddUser = (data) => axios.post(`${API_BASE}/admin/add-user/`, data, getAuthHeaders());
export const getAllAttendances = () => axios.get(`${API_BASE}/admin/attendances/`, getAuthHeaders());
export const getAttendanceById = (id) => axios.get(`${API_BASE}/admin/attendance/${id}/`, getAuthHeaders());
export const updateAttendance = (id, data) => axios.put(`${API_BASE}/admin/attendance/${id}/`, data, getAuthHeaders());
