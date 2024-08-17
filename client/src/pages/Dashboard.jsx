import React from "react";
import ReactDom from "react-dom/client";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MyProgress from "../components/MyProgress";
import Statistics from "../components/Statistics";
import Assignment from "../components/Assignment";
import MyCalender from "../components/MyCalender";


const Dashboard = () => {
  return (
    <div className="app flex bg-gray-100">
      <Sidebar />
      <div className="flex items-center">
        <div className="h-screen w-[2px] rounded bg-gray-300"></div>
      </div>
      <div>
        {/* <Header /> */}
        <MyProgress />
        <div className="flex justify-between">
          <div className="">
            <Statistics />
            <Assignment />
          </div>
          <div className="">
            <MyCalender />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;