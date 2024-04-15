const config = require('./../../config');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const setupSession = async(app) => { 
    app.use(cookieParser());
    app.use(session({
        secret: config.cookie_key, 
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: config.node_env === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            /*
            domain: 'domain.com',
            path: '/',
            sameSite: 'strict' // Strictly same site
            */
        } 
    }));
}

module.exports = {
    setupSession,
};