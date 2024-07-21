
const userService = require('../../services/user/user.services');
const { createSecretToken } = require('../../util/secretToken');
const bcrypt = require("bcryptjs");

const { User } = require('../../models/user.Schema');

async function updateUserStatus(req, res) {
    const { userId } = req.params;
    const { exists } = req.body;

    if (typeof exists !== 'boolean') {
        return res.status(400).json({ message: 'exists must be a boolean' });
    }

    try {
        const updatedUser = await userService.updateUserStatus(userId, exists);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function login (req, res, next)  {
    try {
      const { email, userId } = req.body;
      if(!email || !userId ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email:email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
  
      }
      const auth = await bcrypt.compare(userId,user.userId)
      
      if (auth) {
        console.log(userId);
        console.log(user.userId);
        return res.json({message:'Incorrect password or email' }) 
      }

       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }

module.exports = {
    updateUserStatus,login
};
