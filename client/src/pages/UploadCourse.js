import React, { useState } from "react";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import img from './default.jpg';

const UploadCourse = () => {

  const [imageFileUrl, setImageFileUrl] = useState(img);
  const [videoFileUrl, setVideoFileUrl] = useState(null);
  const { id } = useParams();
  const [videoUploaded, setVideoUploaded] = useState(false);
  const navigate = useNavigate();


  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    cost: '',
    tags: [],
  });

  const handleChange = (e, value) => {
    if (e) {
      const { name, type } = e.target;
      const inputValue = type === 'file' ? e.target.files[0] : e.target.value;

      if (type === 'file' && inputValue) {
        if (name === 'file') {
          setImageFileUrl(URL.createObjectURL(inputValue));
          setCourseData({ ...courseData, file: inputValue }); // Use 'file' as the property name
        } else if (name === 'file2') {
          setVideoFileUrl(URL.createObjectURL(inputValue));
          setCourseData({ ...courseData, file2: inputValue }); // Use 'file2' as the property name
        }
      } else {
        setCourseData({ ...courseData, [name]: inputValue });
      }
    } else {
      // Handle case where there is no event (e.g., for non-input changes)
      setCourseData({ ...courseData, ...value });
    }
  };


  const handleVideoChange = (e) => {
    const videoFile = e.target.files[0];

    if (videoFile) {
      setVideoFileUrl(URL.createObjectURL(videoFile));
      setCourseData({ ...courseData, file2: videoFile });
      setVideoUploaded(true); // Set the flag to true when video is uploaded
    }
  };



  const upload = () => {
    console.log("Course Data:", courseData);

    const formData = new FormData();
    formData.append('imageFile', courseData.file);
    formData.append('videoFile', courseData.file2);
    formData.append('uploader', id);
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('cost', courseData.cost);
    formData.append('tags', courseData.tags);

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }


    axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload/create`, formData)
      .then(res => {
        navigate(`/educator/${id}/dashboard`)
      })
      .catch(err => console.log(err));
  };

  // const convertToBase64 = (e) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //     setImage(reader.result);
  //   };
  //   reader.onerror = (err) => {
  //     console.log(err);
  //   };
  // };

  // const convertVideoToBase64 = (e) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //     setVideoData(reader.result);
  //   };
  //   reader.onerror = (err) => {
  //     console.log(err);
  //   };
  // };

  // const upload = async () => {
  //   try {
  //     if (!image || !videoData) {
  //       console.error('Image or video data is missing.');
  //       return;
  //     }

  //     const response = await axios.post('http://localhost:7000/upload/create', {
  //       ...courseData,
  //       base64: image,
  //       base64Video: videoData,
  //     });

  //     if (response.status === 401) {
  //       navigate('/login');
  //     } else if (response.status === 201) {
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // const handleChangetag = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'tags') {
  //     setCourseData({ ...courseData, [name]: value.split(',').map(tag => tag.trim()) });
  //   } else {
  //     setCourseData({ ...courseData, [name]: value });
  //   }
  // };


  return (
    <div className="m-10 flex flex-col gap-5 justify-center items-center shadow-2xl p-10">
      <h1 className="bold text-5xl mb-10">Course Details</h1>
      <div className="flex gap-16 justify-center items-center">

        <div className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="font-bold">Course title</label>
            <input placeholder="Insert course title" className=" text-sm w-96 p-2 rounded border border-solid border-[#c5c5c5]" type="text" name="title" value={courseData.title} onChange={handleChange} />
          </div>


          <div className="flex flex-col gap-2">
            <label className="font-bold">Course Subtitles</label>
            <input placeholder="Insert course subtitles" type="text" name="tags" className=" text-sm w-96 p-2 rounded border border-solid border-[#c5c5c5]" value={courseData.tags} onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-2 w-96">
            <label className="font-bold">Description</label>
            <ReactQuill
              theme="snow"
              value={courseData.description}
              onChange={(value) => handleChange(null, { description: value })}
              placeholder="Insert your course description"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ size: ["small", false, "large", "huge"] }],
                ],
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Cost</label>
            <input placeholder="Set a price for your course" type="number" name="cost" className=" text-sm w-96 p-2 rounded border border-solid border-[#c5c5c5]" value={courseData.cost} onChange={handleChange} />
          </div>

        </div>


        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-bold">Course Image</label>
            <div className="flex gap-10 justify-center items-center">
              <img src={imageFileUrl} alt="Selected File" className="mb-2 w-56 border border-solid border-black" />
              <div>
                <p className="w-80 mb-5">Upload your course image here. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</p>
                <div className="flex gap-5 border-black">
                  <label htmlFor="fileInput" className="cursor-pointer p-2 border border-solid border-black font-bold hover:bg-[#f0f0f0] transition-all">
                    Upload File
                    <input type="file" id="fileInput" onChange={(e) => handleChange(e, null)} name="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Promotional Video</label>
            <div className="flex gap-10 justify-center items-center">
              {videoUploaded ? (
                <video controls className="mb-2 w-56 border border-solid border-black">
                  <source src={videoFileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={img} alt="Default Video" className="mb-2 w-56 border border-solid border-black" />
              )}
              <div>
                <p className="w-80 mb-5">Your promo video is a quick and compelling way for students to preview what they’ll learn in your course. Students considering your course are more likely to enroll if your promo video is well-made.</p>
                <div className="flex gap-5 border-black">
                  <label htmlFor="fileInputVideo" className="cursor-pointer p-2 border border-solid border-black font-bold hover:bg-[#f0f0f0] transition-all">
                    Upload File
                    <input type="file" id="fileInputVideo" onChange={handleVideoChange} name="file2" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



      {/* <div>
        <input type="file" onChange={convertVideoToBase64} />
      </div> */}


      {/* <div>
        <label>Tags:</label>
        <input type="text" name="tags" value={courseData.tags.join(', ')} onChange={handleChangetag} />
      </div> */}
      <div>
        <button type="button" className="py-2 px-4 bg-orange-500 rounded-full" onClick={upload}>Create Course</button>
      </div>
    </div >
  );
};

export default UploadCourse;
