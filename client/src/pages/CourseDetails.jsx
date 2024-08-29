import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/authContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const { user } = useAuth();
  const authUser = user?.authUser;

  console.log(authUser?.user?._id);

  const serverUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/courses/${id}`
        );
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, serverUrl]);

  const handleEnroll = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/enroll/${id}/${authUser.user._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token-based authentication
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setEnrollmentStatus('Enrolled successfully!');
      } else {
        setEnrollmentStatus(result.message || 'Failed to enroll');
      }
    } catch (err) {
      setEnrollmentStatus('Error enrolling in course');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>No course found</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src={`${serverUrl}/images/${course?.image}`}
              alt={course?.title}
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl font-bold mb-2">{course?.title}</h2>
            <p className="text-lg text-gray-700 mb-4">
              Rating: {course?.rating}
            </p>
            <p className="text-xl font-semibold text-gray-900 mb-4">
              Cost: ${course?.cost}
            </p>
            {course?.videoData && (
              <div className="mt-6">
                <video className="w-full rounded-lg shadow-md" controls>
                  <source
                    src={`${serverUrl}/images/${course?.videoData}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">
                Course Description
              </h3>
              <p className="text-gray-800 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lacinia odio vitae vestibulum. Cras vehicula eros ut erat
                egestas, sed fermentum felis scelerisque. Nulla id consequat
                nunc. Sed et odio nec libero gravida auctor ac nec arcu. Fusce
                ac ultrices libero, ac fermentum erat. Aliquam erat volutpat.
                Donec consequat, ligula ut tempor laoreet, elit dui suscipit
                ligula, id vestibulum eros libero nec ante.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Course Objectives</h3>
              <ul className="list-disc pl-5 text-gray-800 mb-6">
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  Phasellus imperdiet, quam at elementum cursus, ligula ex
                  tempor ligula.
                </li>
                <li>Curabitur vitae orci nec magna gravida fermentum.</li>
                <li>Suspendisse potenti. In hac habitasse platea dictumst.</li>
              </ul>
              <h3 className="text-2xl font-semibold mb-4">
                Additional Information
              </h3>
              <p className="text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lacinia odio vitae vestibulum. Cras vehicula eros ut erat
                egestas, sed fermentum felis scelerisque. Nulla id consequat
                nunc. Sed et odio nec libero gravida auctor ac nec arcu. Fusce
                ac ultrices libero, ac fermentum erat.
              </p>
              <button
                onClick={handleEnroll}
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
              >
                Enroll Now
              </button>
              {enrollmentStatus && (
                <p className="mt-4 text-lg font-semibold text-green-600">
                  {enrollmentStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
