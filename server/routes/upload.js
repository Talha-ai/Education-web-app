const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/course');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/images");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create", upload.fields([{ name: 'imageFile', maxCount: 1 }, { name: 'videoFile', maxCount: 1 }]), async (req, res) => {
  console.log(req.body);
  try {
    const {
      uploader,
      title,
      description,
      cost,
      tags,
    } = req.body;

    const imageFile = req.files['imageFile'][0]; // Access files using the correct key
    const videoFile = req.files['videoFile'][0]; // Access files using the correct key


    const newCourse = new Course({
      uploader,
      title,
      description,
      image: imageFile.filename,
      videoData: videoFile.filename,
      cost,
      tags,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json({ success: true, course: savedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// router.post('/create', async (req, res) => {
//   try {
//     console.log(req.body)
//     const {
//       uploader,
//       title,
//       description,
//       cost,
//       subject,
//       tags,
//       base64,
//       base64Video
//     } = req.body;



//     const newCourse = new Course({
//       uploader,
//       title,
//       description,
//       image: base64,
//       videoData: base64Video,
//       cost,
//       subject,
//       tags,
//     });

//     const savedCourse = await newCourse.save();

//     res.status(201).json({ success: true, course: savedCourse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


// router.get("/courses", async (req, res) => {
//   try {
//     Images.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

module.exports = router;
