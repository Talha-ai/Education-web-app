import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { useToast } from '@chakra-ui/react'; // Add this line
import jwtDecode from 'jwt-decode';

const Login = ({ setIsLoggedIn, setUser }) => {
  const [credentials, setCredentials] = useState({
    userName: '',
    password: '',
    role: 'student',
  });

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      const authUser = data.authUser;

      if (data.user) {
        localStorage.setItem('token', data.user);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('authUserData', JSON.stringify(data.authUser));

        const redirectPath = localStorage.getItem('redirectPath') || '/';
        localStorage.removeItem('redirectPath');

        // Call the login function from AuthContext with user data
        login({ ...data, userType: credentials.role, authUser: data.authUser });

        toast({
          title: 'Login successful',
          status: 'success',
          position: 'top',
          isClosable: true,
        });

        setTimeout(() => {
          navigate(redirectPath);
        }, 600);
      } else {
        toast({
          title: 'Wrong username or password',
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      if (user.exp <= Date.now() / 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      } else {
        const storedAuthUserData = localStorage.getItem('authUserData');
        const authUser = JSON.parse(storedAuthUserData);

        login({ ...user, userType: credentials.role, authUser });

        const redirectPath = localStorage.getItem('redirectPath') || '/';
        localStorage.removeItem('redirectPath');
        navigate(redirectPath);
      }
    }
    // localStorage.setItem('redirectPath', window.location.pathname);
  }, [navigate, login, credentials.role]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="login-container p-12 bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center w-[400px]">
        <h2 className="font-bold text-4xl mb-10 text-gray-700">Login</h2>
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
          <div className="form-group flex flex-col">
            <label className="text-gray-600 mb-2" htmlFor="username">
              Username or Email:
            </label>
            <input
              className="bg-[#f4f4f4] border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group flex flex-col">
            <label className="text-gray-600 mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="bg-[#f4f4f4] border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group flex flex-col">
            <label className="text-gray-600 mb-2" htmlFor="role">
              Role:
            </label>
            <select
              className="bg-[#f4f4f4] border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              name="role"
              id="role"
              value={credentials.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="educator">Educator</option>
            </select>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex gap-3 mt-6 text-gray-600">
          <p>Need an account?</p>
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
