import { CiSearch } from "react-icons/ci";
import { useState } from "react";


const CoursesNav = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('All');

  return (
    <div className="w-full flex justify-between mt-10 px-14 p-5 border border-solid border-b-black">
      <div>
        <span className="text-2xl font-bold">Courses</span>
      </div>
      <div>
        <ul className="flex gap-5 cursor-pointer ml-24">
          <li className={`${selectedNavItem === 'All' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('All')}>All</li>
          <li className={`${selectedNavItem === 'Draft' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('Draft')}>Draft</li>
          <li className={`${selectedNavItem === 'Published' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('Published')}>Published</li>
          <li className={`${selectedNavItem === 'Archived' ? 'text-black' : 'text-gray-500'}`} onClick={() => setSelectedNavItem('Archived')}>Archived</li>
        </ul>
      </div>
      <div>
        <ul className="flex gap-5 cursor-pointer border border-solid border-black">
          <li className="border border-solid border-black px-5">Recency</li>
          <li className="border border-solid border-black px-5">Alphabatically</li>
        </ul>
      </div>
    </div>
  )
}

export default CoursesNav;