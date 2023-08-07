// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create admin Schema
const adminSchema = mongoose.Schema({
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

 // Apply the uniqueValidator plugin to adminSchema.
adminSchema.plugin(uniqueValidator);



// Create Model Name "admin"
const admin = mongoose.model("Admin", adminSchema);

// Make admin Exportable
module.exports = admin;

