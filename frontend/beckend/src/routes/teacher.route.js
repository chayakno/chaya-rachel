const express = require('express');
const router = express.Router();
const {addTeacher,acceptTeacher} = require('../controllers/teacher/teacher.controller');
router.post('/addTeacher', addTeacher);
router.put('/acceptTeacher/:id',acceptTeacher);


module.exports = router;