const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Student = require('../models/student');
const User = require('../models/user');
const mongoose = require('mongoose'); //an ODM(object data modeling) library for MongoDB and node.js

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
);

router.get('/courses/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.post('/enroll/:courseId/:userId', async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.params;

  console.log(courseId, userId)

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    const stu = await Student.findOne({ user: objectIdUserId });
    if (!stu) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (stu.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    stu.enrolledCourses.push(courseId);
    await stu.save();

    res.status(200).json({ success: true, message: 'Enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


module.exports = router;
