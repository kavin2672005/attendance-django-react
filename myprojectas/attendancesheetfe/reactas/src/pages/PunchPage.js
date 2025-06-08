import React from 'react';
import { useNavigate } from 'react-router-dom';
import { punchIn, punchOut } from '../api/attendance';

function PunchPage() {
  const navigate = useNavigate();

  const handlePunchIn = async () => {
    try {
      const res = await punchIn();
      alert(res.data.detail || 'Punched in!');
      navigate('/dashboarduser');
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (detail === 'Already punched in today.') {
        alert(detail);
        navigate('/dashboarduser');
      } else {
        alert(detail || 'Punch in failed');
      }
    }
  };

  const handlePunchOut = async () => {
    try {
      const res = await punchOut();
      alert(res.data.detail || 'Punched out!');
      navigate('/dashboarduser');
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (detail === 'Already punched out today.' || detail === 'You must punch in first.') {
        alert(detail);
        navigate('/dashboarduser');
      } else {
        alert(detail || 'Punch out failed');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome</h2>
      <button onClick={handlePunchIn} style={{ margin: '10px' }}>Punch In</button>
      <button onClick={handlePunchOut} style={{ margin: '10px' }}>Punch Out</button>
    </div>
  );
}

export default PunchPage;
