import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
// import Routes from "./components/Routes";
import './css/index.css';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  createBrowserRouter,
  Router,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EducatorProfilePage from './pages/EducatorProfilePage';
import UploadCourse from './pages/UploadCourse';
import { AuthProvider } from './utils/authContext';
import CourseDetails from './pages/CourseDetails';
import Authenticate from './components/authenticate';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route
              path="/login"
              element={
                <Authenticate
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
                />
              }
            />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route
              path="/user/:id/dashboard"
              element={<Dashboard isLoggedIn={isLoggedIn} user={user} />}
            />
            {/* <Route
              path="/educator/:id"
              element={<EduPage isLoggedIn={isLoggedIn} user={user} />}
            /> */}
            <Route
              path="/educator/:id/dashboard"
              element={
                <EducatorProfilePage isLoggedIn={isLoggedIn} user={user} />
              }
            />
            <Route
              path="/educator/:id/upload"
              element={<UploadCourse isLoggedIn={isLoggedIn} user={user} />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
