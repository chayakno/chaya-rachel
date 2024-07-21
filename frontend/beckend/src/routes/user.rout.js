const express = require('express');
const router = express.Router();
const {updateUserStatus,login} = require('../controllers/User/user.controller');
const {userVerification} =require('../../src/middleware/AuthMiddleware')

router.put('/users/:userId/status', updateUserStatus);
router.post('/login', login)
router.post('/userVerification',userVerification)

module.exports = router;
