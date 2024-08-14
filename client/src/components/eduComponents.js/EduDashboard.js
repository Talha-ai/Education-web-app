// EducatorCourses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoursesNav from "../CoursesNav";
import EducatorCourseDetails from "../EduCourseDetails";
import { useParams } from 'react-router-dom';

const EduDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/educator/${id}/dashboard`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Error fetching courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  return (
    <div className="w-full">
      <CoursesNav />
      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <EducatorCourseDetails courses={courses} />
      )}
    </div>
  );
};

export default EduDashboard;
