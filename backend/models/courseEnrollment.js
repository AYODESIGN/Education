// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create courseEnrollmentSchema
const courseEnrollmentSchema = mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },

});

 // Apply the uniqueValidator plugin to courseEnrollmentSchema.
 courseEnrollmentSchema.plugin(uniqueValidator);



// Create Model Name "courseEnrollment"
const courseEnrollment = mongoose.model("CourseEnrollment", courseEnrollmentSchema);

// Make course Exportable
module.exports = courseEnrollment;

