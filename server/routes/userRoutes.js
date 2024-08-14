const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');
// const { isLoggedIn } = require('../middlewares/auth');

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


module.exports = router;
