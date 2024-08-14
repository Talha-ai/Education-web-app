import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CourseDesp = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    cost: "",
    rating: "",
    subject: "",
    branch: "",
    semester: "",
    tags: [],
  });

  const handleChange = (value) => {
    setCourseData({ ...courseData, description: value });
  };

  return (
    <div>
      {/* Your other form elements */}
      <div className="flex flex-col gap-1">
        <label>Description:</label>
        <ReactQuill
          theme="snow"
          value={courseData.description}
          onChange={handleChange}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
            ],
          }}
        />
      </div>
      {/* Your other form elements */}
    </div>
  );
};

export default CourseDesp;
