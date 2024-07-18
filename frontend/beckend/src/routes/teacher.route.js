const express = require('express');
const router = express.Router();
const {addTeacher,getAllPendingSTeachers} = require('../controllers/teacher/teacher.controller');
router.post('/addTeacher', addTeacher);
router.get('/getAllPendingSTeachers', getAllPendingSTeachers);

module.exports = router;