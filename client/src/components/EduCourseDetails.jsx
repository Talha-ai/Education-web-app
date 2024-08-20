import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { useNavigate } from 'react-router-dom';
import CourseModal from './reactModal';

const EducatorCourseDetails = ({ courses }) => {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();
  const authUser = user?.authUser;
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  // const handleDeleteCourse = async () => {
  //   try {
  //     await axios.delete(`http://localhost:7000/educator/${id}/delete`);
  //     console.log('Course deleted successfully');
  //     setCourse((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
  //   }

  //   catch (error) {
  //     console.error('Error deleting course:', error);
  //   }
  // }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    const userData = authUser;
    // setCourse(userData.courses || []);
    // setEditableFields({
    //   username: userData.username || "",
    //   about: userData.about || "",
    //   email: userData.email || "",
    //   password: userData.password || "",
    //   address: userData.address || "",
    // });
  }, [isLoggedIn, navigate, user]);

  return (
    <div className="m-10 mx-24">
      <h1 className="text-center text-3xl font-bold mb-10">Courses</h1>
      <div className="course-list flex flex-wrap gap-10 justify-center">
        {courses.map((course) => (
          <div
            key={course._id}
            className="shadow-xl rounded-md max-w-[200px] flex flex-col justify-between bg-white p-1 hover:scale-105 transition-transform duration-300"
          >
            <img
              className="rounded-t-md w-full h-40 object-cover"
              src={`${import.meta.env.VITE_BACKEND_URL}/images/${course.image}`}
              alt={course.title}
            />
            <div className="p-3 flex flex-col gap-2">
              <h2 className="font-bold text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">
                {course.title}
              </h2>
              <span className="text-sm text-gray-700">
                {authUser?.user?.username}
              </span>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-blue-600">₹{course.cost}</span>
                {/* <Link to={`/course/${course._id}`} className="text-blue-500 hover:underline">View Course</Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <Link to={`/educator/${authUser?.user?._id}/upload`}>
          <button className="text-5xl rounded-full bg-orange-500 w-12 h-12 flex items-center justify-center text-white shadow-lg hover:bg-orange-600 transition duration-300">
            +
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EducatorCourseDetails;
