// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create Student Schema
const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  pwd: String,
  address: String,
  phone: {type: String, unique: true},
  img: String,
  role: String,

});

 // Apply the uniqueValidator plugin to studentSchema.
studentSchema.plugin(uniqueValidator);



// Create Model Name "student"
const student = mongoose.model("Student", studentSchema);

// Make student Exportable
module.exports = student;

