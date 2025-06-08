import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li><Link to="/register">Add admin</Link></li>
        <li><Link to="/admin/add-user">Add User</Link></li>
        <li><Link to="/admin/attendances">Attendance List</Link></li>
        <li><Link to="/admin/attendance/1">Edit Attendance</Link></li> {/* Example dynamic link */}
        <li><Link to="/print">Export Excel</Link></li>
        <li><Link to="/monthly-report">Monthly Report</Link></li>
        <li><Link to="/notify">Notify Missing Punch</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
