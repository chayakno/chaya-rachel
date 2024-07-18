const express = require('express');
const router = express.Router();
const {addTeacher} = require('../controllers/teacher/teacher.controller');
router.post('/addTeacher', addTeacher);


module.exports = router;