import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #8D3D29;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a2c1f;
  }
`;

const Message = styled.p`
  color: ${({ error }) => (error ? 'red' : 'green')};
  text-align: center;
`;

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setMessage('Registration successful!');
      setError(false);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
      setError(true);
    }
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input type="text" name="address" placeholder="Address (Optional)" value={formData.address} onChange={handleChange} />
        <Input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <Button type="submit">Register</Button>
      </Form>
      {message && <Message error={error}>{message}</Message>}
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </RegisterContainer>
  );
}

export default Register;