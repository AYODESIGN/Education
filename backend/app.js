// import express module
const express = require("express");
// import body parser module
const bodyParser = require("body-parser");
//import bcrypt module
const bcrypt = require("bcrypt");
// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import axios module
const axios  = require("axios");
// import jwt module
const jwt = require('jsonwebtoken');
// import express-session module
const session = require('express-session');


// import mongoose module
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/educationDB");
// create app express
const app = express();

// Models Importation
const Admin = require("./models/admin");
const Teacher = require("./models/teacher");
const Student = require("./models/student");
const Parent = require("./models/parent");
const Course = require("./models/course");
const Score = require("./models/score");
const CourseEnrollment = require("./models/courseEnrollment");



//Appliction Congfig
// confi body-parser (1_EXTRACT OBJECT FROM REQUEST., 2_send JSON RESPONSE)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

//session config
const secretKey = 'ayoub92';
app.use(
  session({
secret: secretKey,
})
);

// ShortCut

app.use("/myFiles", express.static(path.join("backend/files")));

// Media
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf", // Add MIME type for PDF
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/files"); // Update destination folder
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const fileName = name + "-" + Date.now() + "-crococoder-" + "." + extension; // Update variable name
    cb(null, fileName);
  },
});


//////////////////// SIGNUP /////////////////////////

// Business Logic : Teacher signup

app.post("/api/users/signup/teacher", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }, { name: "cv", maxCount: 1 }]), async (req, res) => {
  console.log("here into Signup", req.body);

  try {
    const cryptedPwd = await bcrypt.hash(req.body.pwd, 10);
    console.log("Here crypted Pwd", cryptedPwd);
    req.body.pwd = cryptedPwd;
console.log("req.files", req.files)
console.log("req.files['img']" ,req.files["img"])
console.log("req.files['cv'][0]",req.files["cv"][0])
    const image = req.files["img"][0];
    const pdf = req.files["cv"][0];

    req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
    req.body.cv = `${req.protocol}://${req.get("host")}/myFiles/${pdf.filename}`;

    let teacher = new Teacher(req.body);
    await teacher.save();
    console.log("Success", teacher);

    res.json({ msg: "Added with success" });
  } catch (error) {
    console.error("Here Error", error);
    res.json({ msg: "Error" });
  }
});

// Business Logic : Student signup
app.post("/api/users/signup/student", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), async (req, res) => {
  console.log("here into Signup Student", req.body);

  try {
    const cryptedPwd = await bcrypt.hash(req.body.pwd, 10);
    console.log("Here crypted Pwd", cryptedPwd);
    req.body.pwd = cryptedPwd;

    const image = req.files["img"][0];

    req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
   
    let student = new Student(req.body);
    await student.save();
    console.log("Success", student);

    res.json({ msg: "Added with success" });
  } catch (error) {
    console.error("Here Error", error);
    res.json({ msg: "Error" });
  }
});

app.get("/api/users/signup/student/numbers", (req, res) => {
  console.log("here into get student number");
  Student.find({}, { phone: 1 }).then((docs) => {
    console.log(docs);
    res.json({ studentNumbers: docs });
  });
  
});

// Business Logic : Parent signup
app.post("/api/users/signup/parent", async (req, res) => {
  console.log("here into BL: Parent", req.body);
  try {
    const cryptedPwd = await bcrypt.hash(req.body.pwd, 10);
    console.log("Here crypted Pwd", cryptedPwd);
    req.body.pwd = cryptedPwd;
    let parent = new Parent(req.body);
    await parent.save();
    res.json({ message: "Parent added successfully" });
  } catch (error) {
    console.error("Error saving parent:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Business Logic : admin signup
app.post("/api/users/signup/admin", async (req, res) => {
  console.log("here into BL: admin", req.body);
  try {
    const cryptedPwd = await bcrypt.hash(req.body.pwd, 10);
    console.log("Here crypted Pwd", cryptedPwd);
    req.body.pwd = cryptedPwd;
    let admin = new Admin(req.body);
    await admin.save();
    res.json({ message: "admin added successfully" });
  } catch (error) {
    console.error("Error saving admin:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});


// Business Logic : Add Sign up

app.post(
  "/api/users/signup",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    console.log("here into Signup", req.body);

    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
      console.log("Here crypted Pwd", cryptedPwd);
      req.body.pwd = cryptedPwd;
      req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
      let user = new User(req.body);
      user.save((err, doc) => {
        err
          ? res.json({ msg: "Error" })
          : res.json({ msg: "Added with success" });
      });
    });
  }
);

////////////////////// LOGIN //////////////////////

// Business Logic : Add login 


app.post("/api/users/login", (req, res) => {
  let user;
  console.log("Here Into BL login", req.body);
  Promise.all([
    Parent.findOne({ phone: req.body.phone }),
    Student.findOne({ phone: req.body.phone }),
    Teacher.findOne({ phone: req.body.phone }),
    Admin.findOne({ phone: req.body.phone })
  ])
    .then(([parent, student, teacher, admin]) => {
      user = parent || student || teacher || admin;
      if (!user) {
        console.log("User not found");
        res.json({ msg: "Please check phone" });
      } else {
        // Check Password
        console.log("req.body.pwd", req.body.pwd);
        console.log("user.pwd", user.pwd);
        bcrypt.compare(req.body.pwd, user.pwd, (err, isEqual) => {
          if (err) {
            console.log("Error comparing passwords:", err);
            res.json({ msg: "An error occurred" });
          } else if (isEqual) {
            console.log("Passwords match");
            let userToSend = {
              userId: user._id,
              email: user.email,
              Fname: user.firstName,
              Lname: user.lastName,
              add: user.address,
              img: user.img,
              role: user.role,
              status: user.status,
              childPhone: user.childPhone
            };
            if (user.role === "teacher" && user.status !== "Confirmed") {
              console.log("Teacher not confirmed");
              res.json({ msg: "Teacher is not confirmed" });
            } else {
              const token = jwt.sign(userToSend, secretKey, {
                expiresIn: "1h"
              });
              res.json({ user: token, role: user.role, msg: "2" });
            }
          } else {
            console.log("Passwords do not match");
            res.json({ msg: "Please check Password" });
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ msg: "An error occurred" });
    });
});



////////////////////// Add Course //////////////////////////////
// add course
app.post("/api/course/add", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), async (req, res) => {
  console.log("Course", req.body);

  try {
    
  const image = req.files["img"][0];

    req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
   
    let course = new Course(req.body);
    await course.save();
    console.log("Success", course);

    res.json({ msg: "Added with success" });
  } catch (error) {
    console.error("Here Error", error);
    res.json({ msg: "Error" });
  }
});


//////////////////////////////get course by teacher id/////////////////
app.get("/api/course/:id", (req, res) => {
  console.log("here into get course by ID" ,req.params.id);
  let id = req.params.id;
  Course.find({ teacherId: id }).then((doc) => {
    res.json({ courses: doc });
  });
 
});

//////////////////////////////get course by id/////////////////
app.get("/api/course/one/:id", (req, res) => {
  let id = req.params.id;
  Course.findOne({ _id: id }).then((doc) => {
    console.log(doc)
    res.json({ course: doc });
  });
 
});

// Business Logic: Edit Course

app.put("/api/course", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), (req, res) => {
  console.log("Here into BL: Edit course", req.files);
  
  if (req.files && req.files["img"]) {
    const image = req.files["img"][0];
    req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
  }
  
  Course.updateOne({ _id: req.body._id }, req.body).then((response) => {
    if (response.nModified == "1") {
      res.json({ msg: "Updated with success" });
    } else {
      res.json({ msg: "Error" });
    }
  });
});

// Business Logic: Edit User

// app.put("/api/users/teacherEdit", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), (req, res) => {
//   console.log("Here into BL: Edit Teacher", req.files["img"]);
//   console.log(req.body)
//   if (req.files && req.files["img"]) {
//     const image = req.files["img"][0];
//     req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
//   }
  
//   Teacher.updateOne({ _id: req.body._id }, req.body).then((response) => {
//     if (response.nModified == "1") {
//       res.json({ msg: "Updated with success" });
//     } else {
//       res.json({ msg: "Error" });
//     }
//   });
// });
app.put("/api/users/teacherEdit", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), (req, res) => {
  console.log("Here into BL: Edit Teacher", req.files["img"]);
  console.log(req.body);

  // Create an object to hold the fields to be updated
  const updatedFields = {};

  // Check which fields are sent from the frontend and add them to the updatedFields object
  if (req.body.firstName) {
    updatedFields.firstName = req.body.firstName;
  }

  if (req.body.lastName) {
    updatedFields.lastName = req.body.lastName;
  }

  if (req.body.address) {
    updatedFields.address = req.body.address;
  }

  // You can add more fields here based on what you want to update

  if (req.files && req.files["img"]) {
    const image = req.files["img"][0];
    updatedFields.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
  }

  // Now, update the teacher record in the database with the updated fields
  Teacher.updateOne({ _id: req.body._id }, { $set: updatedFields })
    .then((response) => {
      if (response.nModified === 1) {
        res.json({ msg: "Updated with success" });
      } else {
        res.json({ msg: "Error" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error updating the teacher." });
    });
});

app.put("/api/users/studentEdit", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), (req, res) => {
  // Same code as in the other route handlers, with the necessary changes for the Student model
  // Create an object to hold the fields to be updated
  const updatedFields = {};

  // Check which fields are sent from the frontend and add them to the updatedFields object
  if (req.body.firstName) {
    updatedFields.firstName = req.body.firstName;
  }

  if (req.body.lastName) {
    updatedFields.lastName = req.body.lastName;
  }

  if (req.body.address) {
    updatedFields.address = req.body.address;
  }

  // You can add more fields here based on what you want to update

  if (req.files && req.files["img"]) {
    const image = req.files["img"][0];
    updatedFields.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
  }

  // Now, update the Student record in the database with the updated fields
  Student.updateOne({ _id: req.body._id }, { $set: updatedFields })
    .then((response) => {
      if (response.nModified === 1) {
        res.json({ msg: "Updated with success" });
      } else {
        res.json({ msg: "Error" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error updating the Student." });
    });
});

app.put("/api/users/adminEdit", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), (req, res) => {
  // Same code as in the other route handlers, with the necessary changes for the Admin model
  // Create an object to hold the fields to be updated
  const updatedFields = {};

  // Check which fields are sent from the frontend and add them to the updatedFields object
  if (req.body.firstName) {
    updatedFields.firstName = req.body.firstName;
  }

  if (req.body.lastName) {
    updatedFields.lastName = req.body.lastName;
  }

  if (req.body.address) {
    updatedFields.address = req.body.address;
  }

  // You can add more fields here based on what you want to update

  if (req.files && req.files["img"]) {
    const image = req.files["img"][0];
    updatedFields.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
  }

  // Now, update the Admin record in the database with the updated fields
  Admin.updateOne({ _id: req.body._id }, { $set: updatedFields })
    .then((response) => {
      if (response.nModified === 1) {
        res.json({ msg: "Updated with success" });
      } else {
        res.json({ msg: "Error" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error updating the Admin." });
    });
});
app.put("/api/users/parentEdit", multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]), (req, res) => {
  // Same code as in the Teacher route handler, with the necessary changes for the Parent model
  // Create an object to hold the fields to be updated
  const updatedFields = {};

  // Check which fields are sent from the frontend and add them to the updatedFields object
  if (req.body.firstName) {
    updatedFields.firstName = req.body.firstName;
  }

  if (req.body.lastName) {
    updatedFields.lastName = req.body.lastName;
  }

  if (req.body.address) {
    updatedFields.address = req.body.address;
  }

  // You can add more fields here based on what you want to update

  if (req.files && req.files["img"]) {
    const image = req.files["img"][0];
    updatedFields.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;
  }

  // Now, update the Parent record in the database with the updated fields
  Parent.updateOne({ _id: req.body._id }, { $set: updatedFields })
    .then((response) => {
      if (response.nModified === 1) {
        res.json({ msg: "Updated with success" });
      } else {
        res.json({ msg: "Error" });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error updating the Parent." });
    });
});


//////////////Delete Course by Id /////////////////
// Business Logic: Delete Course By Id
app.delete("/api/course/:id", (req, res) => {
  console.log("Here into BL: Delete  Course by id", req.params.id);
  Course.deleteOne({ _id: req.params.id }).then((response) => {
    response.deletedCount == 1
      ? res.json({ isDeleted: true })
      : res.json({ isDeleted: false });
  });
});
//////////// GET ALL Courses /////////////
app.get("/api/courses", (req, res) => {
  Course.find().then((doc) => {
    res.json({ Course: doc });
    console.log(res)
  });
 
});
///////////////get teacher for course////////////
app.get("/api/users/teacher/:id", (req, res) => {
  console.log("here into get teacher by ID" ,req.params.id);
  let id = req.params.id;
  Teacher.find({ _id: id }).then((doc) => {
    res.json({ Teacher: doc });
  });
 
});

//////////// GET ALL TEACHERS /////////////
app.get("/api/users/teachers/", (req, res) => {
  Teacher.find().then((doc) => {
    res.json({ Teacher: doc });
  });
 
});
//////////// GET Limeted TEACHERS /////////////

app.get("/api/users/teachers/limit", (req, res) => {
  Teacher.find().limit(3).then((doc) => {
    res.json({ Teacher: doc });
  });
 
});

//////////// GET Limeted Courses /////////////

app.get("/api/courses/limit", (req, res) => {
  Course.find().limit(3).then((doc) => {
    res.json({ Course: doc });
  });
 
});
//////////// GET ALL STUDENTS /////////////
app.get("/api/users/students/", (req, res) => {
  console.log("all students")
  Student.find().then((doc) => {
    res.json({ Student: doc });
  });
 
});
// Business Logic: Delete Teacher By Id
app.delete("/api/users/teacher/:id", (req, res) => {
  console.log("Here into BL: Delete  Teacher by id", req.params.id);
  Teacher.deleteOne({ _id: req.params.id }).then((response) => {
    response.deletedCount == 1
      ? res.json({ isDeleted: true })
      : res.json({ isDeleted: false });
  });
});

// Business Logic: Delete Student By Id
app.delete("/api/users/student/:id", (req, res) => {
  console.log("Here into BL: Delete  Teacher by id", req.params.id);
  Student.deleteOne({ _id: req.params.id }).then((response) => {
    response.deletedCount == 1
      ? res.json({ isDeleted: true })
      : res.json({ isDeleted: false });
  });
});
// Business Logic: get Student By Id
app.get("/api/users/student/:id", (req, res) => {
  console.log("Here into BL: get  student  by id", req.params.id);
  Student.findOne({ _id: req.params.id }).then((doc) => {
    res.json({ Student: doc })
  });
});


// Business Logic: get Student By child phone number
app.get("/api/users/student/child/:phone", (req, res) => {
  console.log("Here into BL: get  student  by number", req.params.phone);

  Student.findOne({ phone: req.params.phone }).then((doc) => {
    res.json({ Student: doc })
  });
});

app.put("/api/users/teacher/status/:id", (req, res) => {
 
  let id = req.params.id;
  console.log("here into req.body",req.body)
  Teacher.updateOne({ _id: id }, { $set: req.body }).then((result) => {
    console.log("Here result after update", result);
    result.nModified == 1
      ? res.json({ message: "Edited With Success" })
      : res.json({ message: "Echec" });
  });
});


////////// CREATE ENROLLMENT ////////

app.post("/api/course/enrollment", (req, res) => {
  console.log("Here into BL : add courseEnrollement" , req.body);
  let obj = new CourseEnrollment(req.body);
  obj.save();
  res.status(200).json({ message: "Added with success" });
});

///////////////get Enrolled course for a student /////////
app.get("/api/course/enrolled/:id", (req, res) => {
  console.log("here into get enrolled by ID" ,req.params.id);
  let id = req.params.id;
  CourseEnrollment.find({ studentId: id }).populate('courseId').then((doc) => {
  
    res.json({ enrolledCourses: doc , msg: "1"});
  });
 
});

///////////////get All Enrolled students /////////
app.get("/api/courses/allenrolled", (req, res) => {
  console.log("here into all enrolled")
  CourseEnrollment.find().then((doc) => {
    res.json({ Enrollments: doc });
  });
 
});

///////////////get All Enrolled students by course /////////
app.get("/api/courses/selectedCourse/:id", (req, res) => {

  console.log("here into get selected course enrollment by ID" ,req.params.id);
  let id = req.params.id;
  CourseEnrollment.find({ courseId: id }).populate('courseId').populate('studentId').then((doc) => {
    res.json({ Enrollments: doc });
  });
 
});
///////////////get All enrollments by Id /////////

app.get("/api/courses/selectedEnrollement/:id", (req, res) => {

  console.log("here into get All enrollments by Id" ,req.params.id);
  let id = req.params.id;
  CourseEnrollment.find({ _id: id }).populate('courseId').populate('studentId').then((doc) => {
    res.json({ Enrollments: doc });
  });
 
});
app.get("/api/courses/studentEnrollement/:id", (req, res) => {

  console.log("here into get All enrollments by Id" ,req.params.id);
  let id = req.params.id;
  CourseEnrollment.find({ studentId: id }).populate('courseId').populate('studentId').then((doc) => {
    res.json({ Enrollments: doc });
  });
 
});

////////// CREATE/SAVE SCORE ////////

// app.post("/api/course/score", (req, res) => {
//   console.log("Here into BL : add score" , req.body);
//   let score = new Score(req.body);
//   score.save();
//   res.status(200).json({ message: "Added with success" });
// });
app.post("/api/course/score", (req, res) => {
  console.log("Here into BL: add score", req.body);

  // Check if a score object with the same enrollment ID already exists
  Score.findOne({ enrollmentId: req.body.enrollmentId }).then((existingScore) => {
    if (existingScore) {
      // A score for the enrollment already exists
      return res.json({ error: "Score for the enrollment already exists" });
    }

    // No existing score, create a new one and save it
    let score = new Score(req.body);
   score.save();
  res.status(200).json({ message: "Added with success" });
 });
  });

  ///////////////get All Scores /////////
  app.get("/api/courses/scoring", (req, res) => {
    console.log("here into all scoring")
    
    Score.find().populate('enrollmentId').then((doc) => {
      res.json({ scores: doc });
    });
  
});
  app.get("/api/courses/scoringByStudent", (req, res) => {
    console.log("here into all scoring")
    let id = req.params.id;
    Score.find({enrollmentId: id}).populate('enrollmentId').then((doc) => {
      res.json({ scores: doc });
    });
  
});

////////search for teacher by specialty //////
app.get("/api/users/searchTeacher/:specialty", (req, res) => {
  console.log("Here into BL : Search ALl teachers", req.params.specialty);
  const specialty = req.params.specialty
  Teacher.find({specialty: { $regex: new RegExp(specialty, "i") }}).then((docs) => {
    res.json({ foundedTeachers: docs, msg: "Done" });
  });
});
/// FIND ANY USER BY ID 
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log("Here into BL: get user by id", userId);

  Promise.all([
    Student.findOne({ _id: userId }),
    Parent.findOne({ _id: userId }),
    Teacher.findOne({ _id: userId }),
    Admin.findOne({ _id: userId })
  ]).then(([student, parent, teacher, admin]) => {
    const user = student || parent || teacher || admin;
    res.json({ user });
  }).catch((error) => {
    res.status(500).json({ message: 'Error fetching user by ID' });
  });
});




module.exports = app;



