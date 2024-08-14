import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "../utils/authContext";
import { useToast } from '@chakra-ui/react';

import { FaRegEnvelope } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import myImg from './profile.png'
import { CiSearch } from "react-icons/ci";


const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  console.log('user', user)
  const authUser = user?.authUser;
  const navigate = useNavigate();
  const toast = useToast();

  const logoutToast = () => {
    toast({
      title: "Successfully logged out!",
      status: "success",
      position: "top",
      isClosable: true,
    });
  };

  const handleSignOut = () => {
    logoutToast();
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };


  return (
    <div className="flex  justify-between py-5 px-10 bg-[#eeeeee]">
      <div>
        <h1 className="text-3xl font-bold"><Link to='/'>EduConn</Link></h1>
      </div>
      <div className="flex gap-7">
        <div className="header flex justify-between">
          <div className="input flex items-center ml-5">
            <input className="w-[500px] px-4 py-2 rounded-full outline-none bg-gray-100" type="text" placeholder="Search for a course, lesson, etc..."></input>
            <span className="text-2xl font-bold absolute right-[965px]"><CiSearch /></span>
          </div>
        </div>
        <ul className="flex gap-7 items-center justify-center">
          {/* <li>
            <Link to={`/educator/${authUser?.user?._id}`}>Teach on EduConn</Link>
          </li> */}
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
        <div className="flex gap-7 items-center justify-center">
          {isLoggedIn ? (
            <>
              <button onClick={handleSignOut}>
                <Link to="/login" className="btn btn-primary">
                  Sign out
                </Link>
              </button>
              <div className="profile flex gap-5 text-lg items-center">
                <span className="cursor-pointer"><FaRegEnvelope /></span>
                <span className="cursor-pointer"><FaRegBell /></span>

              </div>
              {isLoggedIn && user?.role === "student" && (
                <button>
                  <Link to={`/user/${authUser?.user?._id}/dashboard`} className="btn btn-primary">
                    <img className="w-8 object-contain cursor-pointer" src={myImg}></img>
                  </Link>
                </button>
              )}

              {isLoggedIn && user?.role === "educator" && (
                <button>
                  <Link to={`/educator/${authUser?.user?._id}/dashboard`} className="btn btn-primary">
                    <img className="w-8 object-contain cursor-pointer" src={myImg}></img>
                  </Link>
                </button>
              )}

            </>
          ) : (
            <>
              <button>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </button>
              <button>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </button>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
