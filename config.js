require('dotenv').config('.env');

module.exports = {
    port: process.env.PORT,

    cookie_key: process.env.COOKIE_KEY,
    node_env: process.env.NODE_ENV,

    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,

    modules: {
        userList: true, 
    }
};