import React, { useState } from 'react';
import userService from '../../services/userService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'vendor', // default role, can be changed as needed
  });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await userService.register(formData);
      setMessage('User successfully registered.');
      setIsError(false);
      // Redirect to login or dashboard after successful registration
    } catch (error) {
      // The error message is now coming from the catch block in the register function
      setMessage(error.message || 'An error occurred during registration.');
      setIsError(true);
    }
  };

  return (
    <>
      {message && (
        <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  );
};

export default Register;