// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create scoreSchema
const scoreSchema = mongoose.Schema({
  enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseEnrollment' },
  score: Number ,
  evaluation: String ,
});

 // Apply the uniqueValidator plugin to scoreSchema.
 scoreSchema.plugin(uniqueValidator);

// Create Model Name "courseEnrollment"
const score = mongoose.model("Score", scoreSchema);

// Make course Exportable
module.exports = score;

