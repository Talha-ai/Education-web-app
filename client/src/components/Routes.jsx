
import React from 'react';
import { BrowserRouter as Router, Routes as RouteConfig, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignUp from '../pages/Signup';
import LogIn from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UploadCourse from '../pages/UploadCourse';
import Courses from '../pages/CoursesPage';
import EducatorProfilePage from '../pages/EducatorProfilePage';
// import Courses from './Courses';
// import Settings from './Settings';

const Routes = () => {
  return (
    <Router>
      <RouteConfig>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/educator/dashboard/upload" element={<UploadCourse />} />
        <Route path="/educator/dashboard" element={<EducatorProfilePage />} />
        {/* <Route path="/courses" element={<Courses />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* Add more routes for user profile, educator profile, etc. */}
      </RouteConfig>
    </Router>
  );
};

export default Routes;
