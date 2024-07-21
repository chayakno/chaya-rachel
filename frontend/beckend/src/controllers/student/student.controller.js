

const studentService = require('../../services/student/student.service');
const userService = require('../../services/user/user.services');
const { func } = require('joi');
const validate = require('../../models/studentValidation');

async function addStudent(req, res, next) {
  const studentData = req.body;

  try {
      // הוספת משתמש חדש
      const newUser = await userService.addUser(req.body, res);
      
      // הוספת סטודנט חדש
      const newStudent = await studentService.addStudent(studentData);
    
      // החזרת תגובה עם המשתמש והסטודנט החדשים
      res.status(201).json({ newStudent, newUser });
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