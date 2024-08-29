const express = require('express');
const router = express.Router();
const passport = require('passport');
const Student = require('../models/student')
const User = require('../models/user');
const mongoose = require('mongoose'); //an ODM(object data modeling) library for MongoDB and node.js

router.get('/getUserInfo', async (req, res) => {
  try {
    console.log("user", req.user)
    // const userId = req.user._id; // Access user ID from the authenticated session
    // // Fetch user information based on user ID
    // const user = await User.findById(userId);
    // console.log(user)
    // if (!user) {
    //   return res.status(404).json({ success: false, message: 'User not found' });
    // }
    // const userData = {
    //   username: user.username,
    // };

    // res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error('Error during getUserInfo:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.get('/enrolled-courses/:userId', async (req, res) => {

  const { userId } = req.params;
  console.log(userId)

  const objectIdUserId = new mongoose.Types.ObjectId(userId);

  try {
    const student = await Student.findOne({ user: objectIdUserId }).populate('enrolledCourses');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    console.log(student)

    res.status(200).json({ success: true, courses: student.enrolledCourses });
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
