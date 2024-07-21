
const express = require('express');
const router = express.Router();
const {addStudent,getAllStudents,getAllPendingStudents,acceptStudent} = require('../controllers/student/student.controller');
router.post('/add', addStudent);
router.get('/getAllStudents', getAllStudents);
router.get('/getAllPendingStudents', getAllPendingStudents);
router.put('/acceptStudent/:id/undefined',acceptStudent)

module.exports = router;
