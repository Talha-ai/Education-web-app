import React from 'react';
import LandingBody from '../components/LandingBody';

const LandingPage = () => {
  console.log(import.meta.env.VITE_BACKEND_URL)
  return (
    <div className="landing-page h-[557px] flex flex-col justify-between">
      <LandingBody />
      <footer className="flex justify-center items-center border border-solid border-black p-2 mt-auto">
        <p>&copy; 2024 Your Education Resource Center</p>
      </footer>
    </div>
  );
};

export default LandingPage;
