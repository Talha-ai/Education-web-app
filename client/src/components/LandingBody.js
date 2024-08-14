import profile from './profile.png'

const LandingBody = () => {
  return (
    <div className="container flex justify-around items-center mt-24">
      <div className="body-info w-96 h-96 flex flex-col justify-center gap-7">
        <h1 className="text-4xl">Best Learning <br></br> <span className="font-bold">Education Platform</span>
          <br></br> <span className="font-bold">in The World</span></h1>
        <p>
          Unlock your full learning potential with our intuitive education
          platform. Seamlessly blending technology and education, we provide an
          immersive learning environment that combines interactive lessons,
          virtual classrooms, and intelligent feedback.
        </p>
      </div>
      <div className="body-img flex w-96 h-96">
        <img src={profile}></img>
      </div>
    </div>
  )
}

export default LandingBody;
