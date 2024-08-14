import React from 'react';

const CourseDetails = ({ course }) => {
  console.log(course)
  const serverUrl = 'http://localhost:7000';
  return (
    <div className=''>
      <div className='flex w-full h-full gap-10 justify-center items-center flex-wrap'>
        <section>
          <img className='w-52' src={`${serverUrl}/images/${course?.image}`} alt={course?.title} />
          <h2>{course?.title}</h2>
          <p>{course?.rating}</p>
          <p>{course?.cost}</p>
          {course?.videoData && (
            <video width="320" height="240" controls>
              <source src={`${serverUrl}/images/${course?.videoData}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </section>
      </div>
    </div>
  );
};

export default CourseDetails;
