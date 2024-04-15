const bcrypt = require("bcrypt");

const enc = {
  cryptPassword(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return callback(err);
      }

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          return callback(err);
        }
        callback(null, hash);
      });
    });
  },

  comparePassword(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
      if (err) {
        return callback(err);
      }
      callback(null, isPasswordMatch);
    });
  },
};

module.exports = enc;
