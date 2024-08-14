import React from "react";
import SidebarLayout from "../routes/SidebarLayout";
import Sidebar from "../components/Sidebar";
import EduDashboard from "../components/eduComponents.js/EduDashboard";

const EducatorProfilePage = () => {
  return (
    <div className="app flex bg-gray-100">
      <Sidebar />
      <EduDashboard />
    </div>
  );
}

export default EducatorProfilePage;
