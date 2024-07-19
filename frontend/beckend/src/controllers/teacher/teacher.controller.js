const teacherService = require('../../services/teacher/teacher.services');
const userService = require('../../services/user/user.services');

async function addTeacher(req, res, next) {
    const teacherData = req.body;
  
    try {

      const newuser = await userService.addUser(req.body);
      const newTeacher = await teacherService.addTeacher(teacherData);
      
      res.status(201).json(newTeacher);
    } catch (err) {
      next(err);
    }
  }
  async function acceptTeacher(req, res, next) {
    const { id } = req.params;
  
    try {

      const updataTeacher = await teacherService.acceptTeacher(id);
      
      
      res.status(201).json(updataTeacher);
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    addTeacher,acceptTeacher
};