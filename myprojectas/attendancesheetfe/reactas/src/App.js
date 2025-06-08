import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PunchPage from './pages/PunchPage';
import AttendanceHistoryPage from './pages/AttendanceHistoryPage';
import AdminAddUserPage from './pages/AdminAddUserPage';
import AttendanceListPage from './pages/AttendanceListPage';
import AttendanceEditPage from './pages/AttendanceEditPage';
import ExportExcelPage from './pages/ExportExcelPage';
import MonthlyReportPage from './pages/MonthlyReportPage';
import NotifyMissingPunchPage from './pages/NotifyMissingPunchPage';
import DashboardPage from './pages/DashboardPage';
import DashboardUserPage from './pages/DashboardUserPage'; // ✅ Case-sensitive match

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/punch" element={<PunchPage />} />
        <Route path="/attendance" element={<AttendanceHistoryPage />} />
        <Route path="/admin/add-user" element={<AdminAddUserPage />} />
        <Route path="/admin/attendances" element={<AttendanceListPage />} />
        <Route path="/admin/attendance/:id" element={<AttendanceEditPage />} />
        <Route path="/print" element={<ExportExcelPage />} />
        <Route path="/monthly-report" element={<MonthlyReportPage />} />
        <Route path="/notify" element={<NotifyMissingPunchPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />            {/* Admin dashboard */}
        <Route path="/dashboarduser" element={<DashboardUserPage />} />        {/* User dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
