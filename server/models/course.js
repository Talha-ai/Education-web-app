const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Educator',
  },
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  image: String,
  videoData: String,
  cost: {
    type: Number,
    // required: true,
  },
  tags: [{ type: String }],
  uploadedAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
