import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAttendanceById, updateAttendance } from '../api/attendance';

function AttendanceEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ punch_in: '', punch_out: '' });

  useEffect(() => {
    // Fetch existing attendance data
    getAttendanceById(id)
      .then(res => {
        setForm({
          punch_in: res.data.punch_in || '',
          punch_out: res.data.punch_out || ''
        });
      })
      .catch(() => {
        alert('Failed to fetch attendance');
      });
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const paddedForm = {
    punch_in: form.punch_in ? form.punch_in + ':00' : '',
    punch_out: form.punch_out ? form.punch_out + ':00' : ''
  };

  try {
    await updateAttendance(id, paddedForm);
    alert('Updated successfully');
    navigate('/admin/attendances');
  } catch (err) {
    console.error(err.response?.data || err);
    alert('Update failed');
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Attendance ID {id}</h2>
      <input
        type="time"
        placeholder="Punch In"
        value={form.punch_in}
        onChange={e => setForm({ ...form, punch_in: e.target.value })}
      />
      <input
        type="time"
        placeholder="Punch Out"
        value={form.punch_out}
        onChange={e => setForm({ ...form, punch_out: e.target.value })}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default AttendanceEditPage;
