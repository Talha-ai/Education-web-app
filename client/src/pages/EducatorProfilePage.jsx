import React from 'react';
import Sidebar from '../components/Sidebar';
import EduDashboard from '../components/eduComponents.jsx/EduDashboard';
const EducatorProfilePage = () => {
  return (
    <div className="app flex bg-gray-100">
      <Sidebar />
      <EduDashboard />
    </div>
  );
};

export default EducatorProfilePage;
