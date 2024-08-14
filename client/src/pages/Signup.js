import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'; // Add this line

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student', // Default role
    experience: '', // For educator
    collegeName: '', // For student
    branch: '', // For student
    year: '', // For student
  });

  const toast = useToast();
  const navigate = useNavigate();

  const successToast = () => {
    toast({
      title: "Successfully registered!",
      status: "success",
      position: "top",
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        successToast();
        setTimeout(() => {
          navigate("/login");
        }, 600);
      }
      else {
        console.error('Signup failed:', response.statusText);
      }
    }
    catch (error) {
      console.error('Error during signup:', error);
    }
  };



  return (
    <div className='flex items-center h-screen'>
      <div className="signup-container p-12 bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center m-auto w-[700px]">
        <h2 className='font-bold text-4xl mb-10'>Sign Up</h2>
        <form onSubmit={handleSubmit} className='w-full'>
          {/* Common fields */}
          <div className='flex flex-wrap gap-6'>

            <label className='flex flex-col w-[48%]'>
              Username
              <input className='bg-transparent border-b border-black outline-none p-2'
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>

            <label className='flex flex-col w-[48%]'>
              Email
              <input className='bg-transparent border-b border-black outline-none p-2'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className='flex flex-col w-[48%]'>
              Password
              <input className='bg-transparent border-b border-black outline-none p-2'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            {/* Role-specific fields */}
            <label className='flex flex-col w-[48%]'>
              <span className='ml-1'>Role</span>
              <select className='bg-transparent border-b border-black outline-none p-2'
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="educator">Educator</option>
              </select>
            </label>

            {/* Additional fields based on the user's role */}
            {formData.role === 'educator' && (
              <label className='flex flex-col w-[48%]'>
                Experience
                <input className='bg-transparent border-b border-black outline-none p-2'
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            {formData.role === 'student' && (
              <>
                <label className='flex flex-col w-[48%]'>
                  College Name
                  <input className='bg-transparent border-b border-black outline-none p-2'
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className='flex flex-col w-[48%]'>
                  Branch
                  <input className='bg-transparent border-b border-black outline-none p-2'
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className='flex flex-col w-[48%]'>
                  Year
                  <input className='bg-transparent border-b border-black outline-none p-2'
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </label>
              </>
            )}
          </div>

          <div className='flex justify-center mt-10'>
            <button type="submit" className="bg-blue-500 text-white py-2 px-8 rounded-full shadow hover:bg-blue-600 transition duration-300 ease-in-out">Sign Up</button>
          </div>
        </form>
        <div className="log-in flex gap-3 mt-6">
          <p>Already have an account?</p>
          <Link to='/login' className="text-blue-500 hover:text-blue-600">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
