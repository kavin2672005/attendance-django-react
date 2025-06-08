import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/attendance';

function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    full_name: '',
    phone_number: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerUser(form);
      alert('Registered successfully');
      navigate('/');
    } catch (err) {
      alert('Registration failed');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="text" name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
      <input type="text" name="phone_number" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input type="password" name="password2" placeholder="Confirm Password" value={form.password2} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
