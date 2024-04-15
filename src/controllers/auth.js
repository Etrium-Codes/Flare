const db = require("./../utils/mysql");
const enc = require("./../utils/encryption");

class Auth {
  login(username, password) {
    return new Promise((resolve, reject) => {
      db.query("SELECT password FROM users WHERE username = ? LIMIT 1", [
        username,
      ])
        .then((rows) => {
          if (rows.length === 0) {
            return reject("User not found.");
          }
          const hash = rows[0].password;

          enc.comparePassword(password, hash, (err, isMatch) => {
            if (err) {
              return reject("Error comparing password.");
            }
            if (isMatch) {
              resolve("Login successful.");
            } else {
              reject("Password incorrect.");
            }
          });
        })
        .catch(() => reject("Database error during login."));
    });
  }

  register(username, password) {
    return new Promise((resolve, reject) => {
      enc.cryptPassword(password, (err, hash) => {
        if (err) {
          return reject("Error hashing password.");
        }

        db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
          username,
          hash,
        ])
          .then(() => resolve("User registered successfully."))
          .catch(() => reject("Database error during user registration."));
      });
    });
  }
}

module.exports = Auth;
