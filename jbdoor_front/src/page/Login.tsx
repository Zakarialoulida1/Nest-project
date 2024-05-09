import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });
      if (response.status === 201) {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
       console.log('login success let\'s go to home');
       
        Navigate('/');
    }
      // Do something with the response, such as storing tokens in local storage and redirecting the user
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials'); // Set error message for display
    }
  };

  return (
    <form className='flex flex-col justify-center items-center'  onSubmit={handleSubmit}>
     
      <input
      className='border border-red-400 '
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
         className='border border-red-400 '
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
