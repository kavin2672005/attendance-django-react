import React, { useEffect, useState } from 'react';
import { getAttendanceHistory } from '../api/attendance';

function AttendanceHistoryPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getAttendanceHistory().then(res => setRecords(res.data));
  }, []);

  return (
    <div>
      <h2>Attendance History</h2>
      <ul>
        {records.map((r, index) => (
          <li key={index}>
            Date: {r.date} | In: {r.punch_in} | Out: {r.punch_out}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceHistoryPage;
