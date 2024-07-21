

const studentService = require('../../services/student/student.service');
const userService = require('../../services/user/user.services');
const { func } = require('joi');
const validate = require('../../models/studentValidation');

async function addStudent(req, res, next) {
    const studentData = req.body;
  
    try {
    //    const { error, value } = validate.validate(studentData, { abortEarly: false });
    //   if (error) {
    //     console.log("error from ...");
    //     const errors = error.details.map(error => error.message);
    //     return res.status(400).json({ errors }); 
    //   }
      const newuser = await userService.addUser(req.body);
      const newStudent = await studentService.addStudent(studentData);
      
      res.status(201).json({newStudent,newuser});
    } catch (err) {
      next(err);
    }
  }

  const acceptStudent=async(req, res, next) =>{
    const {id} = req.params;
  
    try {
    
      const updatetudent = await studentService.acceptStudent(id);
      
      
      res.status(201).json(updatetudent);
    } catch (err) {
      next(err);
    }
  }



const getAllStudents = async (req, res) => {
    try {
       
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPendingStudents = async (req, res) => {
    try {
        const students = await studentService.getAllPendingStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addStudent,getAllStudents,getAllPendingStudents,acceptStudent
};