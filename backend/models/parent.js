// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create parent Schema
const parentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  pwd: String,
  address: String,
  phone: {type: String, unique: true},
  childPhone: String,
  img: String,
  role: String,

});

 // Apply the uniqueValidator plugin to parentSchema.
parentSchema.plugin(uniqueValidator);



// Create Model Name "parent"
const parent = mongoose.model("Parent", parentSchema);

// Make parent Exportable
module.exports = parent;

