import React, { useEffect, useState } from 'react';
import { BsStack } from 'react-icons/bs';
import ProgressBar from './ProgressBar';
import { HiViewGridAdd } from 'react-icons/hi';
import { IoIosCube } from 'react-icons/io';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { useAuth } from '../utils/authContext';

const MyProgress = () => {
  const { isLoggedIn, user } = useAuth();
  const authUser = user?.authUser;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/enrolled-courses/${
            authUser.user._id
          }`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchEnrolledCourses();
    }
  }, [isLoggedIn]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Assuming that `courses` array has at least 3 elements
  const courseTitles = courses.map((course) => course.title);

  return (
    <div className="progress m-10">
      <div>
        <h2 className="font-bold">My Progress</h2>
      </div>

      <div className="carousel flex text-white justify-between w-[900px] h-64 rounded-2xl mt-5 bg-blue-950">
        <div className="info p-7">
          <div className="name text-gray-300"> Hi, {authUser?.username}!</div>
          <div className="flex flex-col h-full justify-between">
            <div className="font-semibold text-3xl mt-2">
              You have completed <br></br> {courses.length} lessons this week!
            </div>
            <div>
              <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold mb-5 flex items-center gap-2">
                SEE ALL{' '}
                <span>
                  <HiOutlineArrowUpRight />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="cards p-3 flex gap-5 text-black">
          <div className="card flex flex-col justify-between bg-purple-400 px-3 py-5 rounded-2xl">
            <div className="flex justify-between">
              <div className="">01</div>
              <div>:</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col font-bold gap-2 w-32">
                <span className="text-4xl">
                  <BsStack />
                </span>
                {courseTitles[0] || 'Design composition'}
              </div>
              <div className="progress text-[13px] "> 12 lessons | 54%</div>
              <ProgressBar percentage={54} />
            </div>
          </div>

          <div className="card flex flex-col justify-between bg-orange-200 px-3 py-5 rounded-2xl">
            <div className="flex justify-between">
              <div>02</div>
              <div>:</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col font-bold gap-2 w-32">
                <span className="text-4xl">
                  <HiViewGridAdd />
                </span>
                {courseTitles[1] || 'UX Design Foundations'}
              </div>
              <div className="progress text-[13px] "> 17 lessons | 83%</div>
              <ProgressBar percentage={83} />
            </div>
          </div>

          <div className="card flex flex-col justify-between bg-yellow-300 px-3 py-5 rounded-2xl">
            <div className="flex justify-between">
              <div>03</div>
              <div>:</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col font-bold gap-2 w-32">
                <span className="text-4xl">
                  <IoIosCube />
                </span>
                {courseTitles[2] || '3D Design Foundations'}
              </div>
              <div className="progress text-[13px] "> 13 lessons | 21%</div>
              <ProgressBar percentage={21} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
