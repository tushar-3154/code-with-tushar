const express = require('express');


const authcontroller = require('../controllers/auth')

const { check, body } = require('express-validator');

const router = express.Router()
router.get('/login', authcontroller.getlogin);


router.get('/signup', authcontroller.getsignup);


router.post('/login',

    [
        body('email')
            .isEmail()
            .withMessage('Please enter valid email')
            .normalizeEmail(),
        body('password', 'password has to be valid.')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    authcontroller.postlogin);


router.post('/signup',
    // [
    //     check('email')
    //         .isEmail()
    //         .withMessage('Please enter valid email')
    //         .custom((value, { req }) => {

    //             return User.findOne({ email: value })
    //                 .then(userdoc => {
    //                     if (userdoc) {
    //                         return Promise.reject('Email exists already, please choose different one');

    //                     }
    //                 });
    //         })
    //         .normalizeEmail(),
    //     body('password', 'please enter a password only numbers and text and at least 5 character.')
    //         .isLength({ min: 5 })
    //         .isAlphanumeric()
    //         .trim(),
    //     body('confirmpassword')
    //         .trim()
    //         .custom((value, { req }) => {
    //             if (value !== req.body.password) {
    //                 throw new Error('Password have to match !');
    //             }
    //             return true;
    //         })

    // ]
    authcontroller.postsignup);


router.post('/logout', authcontroller.postlogout);

router.get('/reset', authcontroller.getreset);

router.post('/reset', authcontroller.postreset);

router.get('/reset/:token', authcontroller.getnewpassword);

router.post('/reset', authcontroller.postnewpassword);



// router.post('/login', authcontroller.postlogin);
module.exports = router;