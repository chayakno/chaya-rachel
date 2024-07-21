const User = require("../models/user.Schema");
const jwt = require("jsonwebtoken");

async function userVerification(req, res) {
    console.log("from function");
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.name });
      else return res.json({ status: false });
    }
  });
}

module.exports = {
  userVerification
};
