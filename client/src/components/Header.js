import { FaRegEnvelope } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import myImg from './profile.png'
import { CiSearch } from "react-icons/ci";



const Header = () => {
  return (
    <div className="header flex justify-between">
      <div className="input flex items-center ml-5">
        <input className="w-[500px] px-4 py-2 rounded-full outline-none bg-gray-100" type="text" placeholder="Search for a course, lesson, etc..."></input>
        <span className="text-2xl font-bold absolute right-[965px]"><CiSearch /></span>
      </div>
      <div className="profile flex gap-5 text-lg items-center">
        <span className="cursor-pointer"><FaRegEnvelope /></span>
        <span className="cursor-pointer"><FaRegBell /></span>
        <img className="w-8 object-contain cursor-pointer" src={myImg}></img>
      </div>
    </div>
  )
}

export default Header;