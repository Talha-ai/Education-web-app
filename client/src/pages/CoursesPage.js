import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CourseDetails from './CourseDetails';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [educatorNames, setEducatorNames] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/courses`);
        if (response.status === 401) {
          navigate('/login');
        } else {
          console.log(response.data)
          setCourses(response.data);


          const names = await Promise.all(
            response.data.map(async (course) => {
              const educatorName = await fetchEducatorName(course.uploader);
              return educatorName;
            })
          );

          setEducatorNames(names);

        }
      }

      catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, [navigate]);


  const serverUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchEducatorName = async (educatorId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/educator/${educatorId}/profile`);
      return response.data.username;
    } catch (error) {
      console.error('Error fetching educator name:', error);
      return '';
    }
  };

  return (
    <div className='my-10 mx-5'>
      <h1 className='text-center my-10 font-bold text-3xl'>COURSES</h1>
      <div className='grid gap-10 justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {courses.map((course, index) => (
          <div key={course._id} className='shadow-custom rounded-lg hover:scale-95 transition-all'>
            <Link to={`/course/${course._id}`} className='block bg-[#f4f4f4] p-1 rounded-b-lg'>
              <img className='w-full h-40 object-cover rounded-t-lg' src={`${serverUrl}/images/${course?.image}`} alt={course?.title} />
              <div className='p-3'>
                <h2 className='font-bold text-lg truncate'>{course?.title}</h2>
                <p className='text-sm text-gray-600'>{educatorNames[index]}</p>
                <p className='text-sm text-yellow-500'>{course?.rating}</p>
                <p className='text-sm text-green-600'>₹{course?.cost}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CoursesPage;
