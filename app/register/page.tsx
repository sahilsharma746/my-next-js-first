"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Correct import for useRouter in App Router
import Image from 'next/image';
import '../../styles/login-register.css'; // Import the CSS file

export default function Register() {
    const router = useRouter();  // Initialize the router

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        user_name: '',
        password: '',
        conf_password: ''
      });
    
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');

      const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        // Simple validation
        if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
          setError('All fields are required');
          return;
        }
    
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setSuccessMessage(data.message);
            setError('');
            router.push('/dashboard');  // Redirect to the dashboard page after successful registration

          } else {
            setError(data.error || 'Something went wrong');
          }
        } catch (err) {
          setError('Server error');
        }
      };
    

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 login-register-container">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {error && <div className="text-red-500">{error}</div>}
        <form className='login-register-form' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">First Name</label>
            <input 
              type="text" 
              id="first_name" 
              name="first_name" 
              className="mt-1 block text-gray-800 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter First Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input 
              type="text" 
              id="last_name" 
              name="last_name" 
              className="mt-1 block text-gray-800 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Last Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">User Name</label>
            <input 
              type="text" 
              id="user_name" 
              name="user_name" 
              className="mt-1 block text-gray-800 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="mt-1 block text-gray-800 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="mt-1 block text-gray-800 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="conf_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password"
              id="conf_password" 
              name="conf_password" 
              className="mt-1 block text-gray-800 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="confirm password"
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Register
          </button>
        </form>
        
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login here</a>
        </p>
      </div>
    </div>
  );
}
