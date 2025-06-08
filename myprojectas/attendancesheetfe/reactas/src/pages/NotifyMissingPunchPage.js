import React from 'react';
import { notifyMissing } from '../api/attendance';
import { useNavigate } from 'react-router-dom';

function NotifyMissingPunchPage() {
  const navigate = useNavigate();

  const handleNotify = async () => {
    try {
      await notifyMissing();
      alert('Notified missing punches'); 
      // After the user clicks “OK” on the alert, navigate to dashboard:
      navigate('/dashboard');
    } catch (error) {
      console.error('Notification error:', error.response || error.message || error);
      alert('Notification failed');
    }
  };

  return (
    <div>
      <h2>Admin: Notify Users with Missing Punch</h2>
      <button onClick={handleNotify}>Notify</button>
    </div>
  );
}

export default NotifyMissingPunchPage;
