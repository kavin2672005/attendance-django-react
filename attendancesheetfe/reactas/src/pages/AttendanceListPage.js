import React, { useEffect, useState } from 'react';
import { getAllAttendances } from '../api/attendance';
import { Link } from 'react-router-dom';

function AttendanceListPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllAttendances().then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>All Attendances</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date</th>
            <th>Punch In</th>
            <th>Punch Out</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map(att => (
            <tr key={att.id}>
              <td>{att.id}</td>
              <td>{att.username}</td>
              <td>{att.user_email}</td>
              <td>{att.date}</td>
              <td>{att.punch_in || '—'}</td>
              <td>{att.punch_out || '—'}</td>
              <td><Link to={`/admin/attendance/${att.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceListPage;
