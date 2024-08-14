const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import your Course model

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

const deleteMeal = async (req, res) => {
  const { mealid } = req.params;
  try {
    // Find the meal to get the chefId
    const meal = await mealsModel.findById(mealid);

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    // Delete the meal
    await mealsModel.findByIdAndDelete(mealid);

    // Remove the meal from the chef's meals array
    await chefModel.findByIdAndUpdate(meal.chefName, {
      $pull: { meals: mealid },
    });

    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = router;
