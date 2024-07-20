const express = require('express');
const router = express.Router();
const {updateUserStatus} = require('../controllers/User/user.controller');

router.put('/users/:userId/status', updateUserStatus);



module.exports = router;
