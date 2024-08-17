import { useState } from "react";
import { IoGrid } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  const [selectedNavItem, setSelectedNavItem] = useState('Dashboard');
  const { isLoggedIn, user } = useAuth();
  const authUser = user?.authUser;
  const navigate = useNavigate();
  console.log(user)

  const navigateTo = (path) => {
    navigate(path);
    setSelectedNavItem(path);
  };

  return (
    <div className="navbar m-10 flex flex-col items-center justify-between">
      <div>

        <div className="nav-links">
          <ul className="flex flex-col gap-7">

            {/* dashboard */}

            {user?.role === "student" && (
              <li
                className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === "Dashboard" ? "text-black" : "text-gray-500"
                  }`}
                onClick={() => navigateTo(`user/${user.user_id}/dashboard`)}
              >
                <IoGrid />
                Dashboard
              </li>
            )}

            {user?.role === "educator" && (
              <li
                className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === "Dashboard" ? "text-black" : "text-gray-500"
                  }`}
                onClick={() => navigateTo(`/educator/${user.user_id}/dashboard`)}
              >
                <IoGrid />
                Dashboard
              </li>
            )}

            {/* schedule */}

            {user?.role === "student" && (
              <li
                className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === "Schedule" ? "text-black" : "text-gray-500"
                  }`}
                onClick={() => navigateTo(`user/${user.user_id}/schedule`)}
              >
                <IoGrid />
                Schedule
              </li>
            )}

            {user?.role === "educator" && (
              <li
                className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === "Schedule" ? "text-black" : "text-gray-500"
                  }`}
                onClick={() => navigateTo(`/educator/${user.user_id}/schedule`)}
              >
                <IoGrid />
                Schedule
              </li>
            )}



            {/* <li className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === 'Schedule' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('Schedule')}>
              <SlCalender />Schedule
            </li> */}
            <li className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === 'Courses' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('Courses')}>
              <BsFillJournalBookmarkFill />Courses
            </li>
            <li className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === 'Messages' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('Messages')}>
              <BiMessageSquareDetail />Messages
            </li>
            <li className={`flex items-center gap-2 font-bold text-sm cursor-pointer ${selectedNavItem === 'Settings' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('Settings')}>
              <IoSettingsSharp />Settings
            </li>
          </ul>
        </div>
      </div>

    </div >
  );
}

export default Sidebar;