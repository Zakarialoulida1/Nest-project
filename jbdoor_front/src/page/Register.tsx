import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Define a schema using Zod
const userSchema = z.object({
  name: z.string(),
  role: z.string(),
  password: z.string(),
  email: z.string().email(),
});

// Define TypeScript type for form data
type FormData = z.infer<typeof userSchema>;

// Example component using Zod schema
const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/auth/register',    formData);
        console.log(response)
        if (response.status === 201) {
            const token = response.data.access_token;
            localStorage.setItem('token', token);
           
            Navigate('/');
        }
    } catch (error) {
       
            console.error('regiter failed:', error);
            setError('Invalid credentials');
          
    }
  };

  return (
    <form className='flex flex-col justify-center items-center'  onSubmit={handleSubmit}>
      <input
      className='border border-red-400'
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <select
      className='border border-red-400'
        name="role"
        value={formData.role}
        onChange={handleChange}
   
      >
        <option value="">Select role</option>
        <option value="ADMIN">ADMIN</option>
        <option value="ENGINEER">ENGINEER</option>
        <option value="INTERN">INTERN</option>
      </select>
      <input
      className='border border-red-400'
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
      className='border border-red-400'
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterForm;
