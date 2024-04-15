const mysql = require('mysql2');
const config = require('./../../config.js');

class MySQLWrapper {
  constructor(config) {
    if (MySQLWrapper.instance) {
      return MySQLWrapper.instance;
    }

    this.connection = mysql.createConnection(config);
    MySQLWrapper.instance = this;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  query(sql, args = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

const dbConfig = {
  host: config.db_host,
  database: config.db_name,
  user: config.db_user,
  password: config.db_password,
};

// Create and export a singleton instance
const dbInstance = new MySQLWrapper(dbConfig);
module.exports = dbInstance;
