const express = require('express');
const router = express.Router();
const {addTeacher,acceptTeacher,getAllPendingSTeachers} = require('../controllers/teacher/teacher.controller');
router.post('/addTeacher', addTeacher);
router.put('/acceptTeacher/:id/undefined',acceptTeacher);
router.get('/getAllPendingSTeachers', getAllPendingSTeachers);


module.exports = router;