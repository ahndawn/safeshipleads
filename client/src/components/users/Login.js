import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import { AuthContext } from '../../services/AuthContext'; // Adjust the path as necessary

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext); // Use the context

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

      // Update global authentication state
      updateAuth(true);

      // Store user data in localStorage or manage it as needed
      localStorage.setItem('user', JSON.stringify(data));

      // Redirect to the homepage or dashboard after successful login
      navigate('/');
    } catch (error) {
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