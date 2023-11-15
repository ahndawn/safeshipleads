import React, { useState } from 'react';
import userService from '../../services/userService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', // Changed from username to email to match your backend
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await userService.login(formData);
      setMessage('Login successful.');
      setIsError(false);
      console.log(data);
      // Redirect to dashboard after successful login
    } catch (error) {
      // Check if the error response exists and has a data property
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'An unexpected error occurred.';
  
      setMessage(errorMessage);
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
          type="email" // Changed to email input type
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default Login;