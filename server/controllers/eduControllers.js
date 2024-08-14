const Course = require('../models/course');
const Educator = require('../models/educator');
const User = require('../models/user');

const coursesEdu = async (req, res) => {
  try {
    const { educatorId } = req.params;

    const educator = await Educator.findOne({ user: educatorId });
    if (!educator) {
      return res.status(404).json({ error: 'Educator not found' });
    }

    const courses = await Course.find({ uploader: educatorId });

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateEdu = async (req, res) => {

}

const deleteEdu = async (req, res) => {
  try {
    const { educatorId } = req.params;
    const deletedEdu = await Educator.findByIdAndDelete(educatorId);
    if (!deletedEdu) {
      return res.status(404).json({ message: "Educator not found" });
    }
    res.status(200).json({ message: "Educator deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEducatorName = async (req, res) => {
  try {
    const educator = await User.findById(req.params.educatorId);
    if (!educator) {
      return res.status(404).json({ message: 'Educator not found' });
    }
    const { _id, username, /* Add other fields if needed */ } = educator;
    res.json({ _id, username /* Add other fields if needed */ });
  } catch (error) {
    console.error('Error fetching educator profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  coursesEdu,
  updateEdu,
  deleteEdu,
  getEducatorName,
};
