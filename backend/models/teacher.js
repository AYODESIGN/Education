// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create Teacher Schema
const teacherSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  pwd: String,
  specialty: String,
  address: String,
  phone: {type: String, unique: true},
  img: String,
  cv: String,
  role: String,
  status: String,

});

 // Apply the uniqueValidator plugin to teacherSchema.
teacherSchema.plugin(uniqueValidator);



// Create Model Name "Teacher"
const teacher = mongoose.model("Teacher", teacherSchema);

// Make Teacher Exportable
module.exports = teacher;

