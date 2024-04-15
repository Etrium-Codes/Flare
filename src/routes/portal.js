const express = require('express');

const router = express.Router();

// Routes
router.get('/', (req, res) => {
    const user = req.session.user;
    const notifyMessage = "Welcome back!";

    res.render('portal/index', { user, notifyMessage });
});

router.get('/settings', (req, res) => {
    res.render('portal/settings');
});

module.exports = router;