const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, "111", { 
    expiresIn: 3 * 24 * 60 * 60, 
    algorithm: 'HS256'
  });
};
