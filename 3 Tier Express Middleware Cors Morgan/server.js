const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const fs = require("node:fs");
const path = require("node:path");

let app = express();
app.use(cors());
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


let emwf1 = (req,res,next)=>{
  console.log("Inside emwf1");
next();
};

let emwf2 = (req,res,next)=>{
  console.log("Inside emwf2");
  next();
};

let emwf3 = (req,res,next)=>{
  console.log("Inside emwf3");
  next();
};


app.use(emwf1); 
app.use(emwf2);
app.use(emwf3)

let employeeSchema = new mongoose.Schema({
  _id: String,
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  country: String,
  department: String,
  profilePic: String,
  age: Number,
});

let Employee = new mongoose.model("empolyee", employeeSchema, "dummy1"); // Here  Employee class name for Database.

app.get("/lists", async (req, res) => {
  let genderList = await Employee.find().distinct("gender");
  let departmentsList = await Employee.find().distinct("department");
  let countriesList = await Employee.find().distinct("country");

  let listsObj = {
    genders: genderList,
    departments: departmentsList,
    countries: countriesList,
  };

  res.json(listsObj);
  console.log(listsObj);
});




// API(resource) for getting employee data in client through this API point.
 app.get("/getEmployeeData", 
  
  emwf1,
  emwf2,
  emwf3,

  async (req, res) => {

  console.log(req.query);
  let employeeData = await Employee.find().and([
    {gender:req.query.gender},
{department:req.query.department},
    { country: req.query.country } 
  ]);

  res.json(employeeData);
  console.log(employeeData);
});

// Port Number.
app.listen(1234, () => {
  console.log("Port Number is 1234");
});

// get Datafrom database.
// let getDataFromDatabase = async()=>{
//     let EmployeeData = await Employee.find();
//     console.log(EmployeeData);
// }

//  It is to connect with Database.
let connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ravi:Ravi@createdatabase.29g4i.mongodb.net/dummyData?retryWrites=true&w=majority&appName=createDatabase"
    );
    console.log("Successfully connected to Database");
    // getDataFromDatabase();
  } catch (error) {
    console.log("Error in connection with database", error);
  }
};
connectToDB();
