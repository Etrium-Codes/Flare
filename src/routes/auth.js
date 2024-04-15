const express = require('express');
const Auth = require('./../controllers/auth');

const router = express.Router();


// Routes
router.get('/login', (req, res) => {

    const errorMessage = false;

    res.render('auth/login', { errorMessage });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const authController = new Auth;

    authController.login(username, password)
        .then(message => {
            console.log(`sucess: ${message}`);
            req.session.user = username;
            return res.redirect('/portal/');
        })
        .catch(errorMessage => {
            res.render('auth/login', { errorMessage });
        });
})

router.get('/register', (req, res) => {
    const errorMessage = false;
    res.render('auth/register', { errorMessage });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const authController = new Auth;

    authController.register(username, password)
        .then(message => {
            return res.redirect('/auth/login');
        })
        .catch(errorMessage => {
            res.render('auth/register', { errorMessage });
        });
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
        if (err) {
            console.error('Session destruction error:', err);
            res.render('portal/index', { notifyMessage });
        } else {
            res.clearCookie('connect.sid'); 
            res.redirect('/auth/login'); 
        }
        });
    } else {
        res.redirect('/auth/login');
    }     
});

module.exports = router;