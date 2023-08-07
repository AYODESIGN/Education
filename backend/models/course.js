// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create Course Schema
const courseSchema = mongoose.Schema({
  name: String,
  description: String,
  duration:String,
  teacherId: {type: String, unique: false},
  img: String,

});

 // Apply the uniqueValidator plugin to courseSchema.
courseSchema.plugin(uniqueValidator);



// Create Model Name "course"
const course = mongoose.model("Course", courseSchema);

// Make course Exportable
module.exports = course;

