const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Educator = require('../models/educator');
const Student = require('../models/student');

router.post('/signup', async (req, res) => {
  const { username, email, password, role, experience, collegeName, branch, year } = req.body;

  try {
    const hash = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hash,
      role,
    });

    await user.save();

    if (role === 'educator') {
      const educator = new Educator({
        user: user._id,
        username,
        experience,
      });

      await educator.save();
    } else if (role === 'student') {
      const student = new Student({
        user: user._id,
        username,

        collegeName,
        branch,
        year,
      });

      await student.save();
    }

    res.status(201).json({ success: true, message: 'User registration successful.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Validate the role
    if (role !== 'student' && role !== 'educator') {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid role',
      });
    }

    const userModel = role === 'student' ? Student : Educator;
    const user = await User.findOne({ username });

    if (!user || user.role !== role) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const validPswd = await bcrypt.compare(password, user.password);

    if (validPswd) {
      // Create a JWT token
      jwt.sign(
        { user_id: user._id, username: user.username, role: role },
        'secret-key',
        { expiresIn: '24h' },
        async (err, token) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error creating JWT token' });
          }

          const authUser =
            role === 'student'
              ? await Student.findOne({ user: user._id }).populate('user', 'username')
              : await Educator.findOne({ user: user._id }).populate('user', 'username');

          return res.status(200).json({ success: true, message: 'Login successful', user: token, role, authUser });
        }
      );
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials', user: false });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




router.post('/details', async (req, res) => {
  const { token } = req.body;
  try {
    const { user_id } = jwt.verify(token, 'secret-key');
    const userDetails = await User.findOne({ _id: user_id });
    res.status(200).send({ userDetails });
  }
  catch (err) {
    res.status(500).send({ msg: "auth failed" });
  }
})

module.exports = router;
