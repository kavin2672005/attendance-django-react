import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAddUser } from '../api/attendance'; // your axios API call

function AdminAddUserPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    phone_number: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAddUser(formData);
      alert('User added successfully');
      // Redirect to dashboard page (change '/' if your dashboard path is different)
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to add user: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AdminAddUserPage;
