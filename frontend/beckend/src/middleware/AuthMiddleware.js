const jwt = require('jsonwebtoken');
const {User} = require('../models/user.Schema'); 
require('dotenv').config(); 

async function userVerification(req, res) {
  console.log("userVerification function called");


  const token = req.cookies.token; 

  console.log('Cookies:', token);

  if (!token) {
    console.log("No token found in cookies");
    return res.json({ status: false });
  }

 
  jwt.verify(token, "111", { algorithms: ['HS256'] }, async (err, data) => {
    if (err) {
      console.log("JWT verification failed:", err);
      return res.json({ status: false });
    } else {
      console.log("JWT verified successfully");
      try {
        console.log(data);
        const user = await User.findById(data.id);
        if (user) {
          console.log("User found:", user.name);
          return res.json({ status: true, user: user.name });
        } else {
          console.log("User not found");
          return res.json({ status: false });
        }
      } catch (error) {
        console.log("Error finding user:", error);
        return res.json({ status: false });
      }
    }
  });
}

module.exports = {
  userVerification
};
