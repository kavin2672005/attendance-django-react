import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Dashboard</h1>

      <button onClick={() => navigate('/punch')}>
        Punch In/Out
      </button>

      <button onClick={() => navigate('/attendance')}>
        Attendance History
      </button>
    </div>
  );
}

export default UserDashboard;
