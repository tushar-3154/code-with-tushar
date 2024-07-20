const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// const sendgridtransport = require('nodemailer-sendgrid-transport')
const User = require('../models/user');
const user = require('../models/user');

const { check, validationResult } = require('express-validator');
const { ValidationError } = require('sequelize');

// const transporter = nodemailer.createTransport(sendgridtransport({
//     auth: {

//         // api_key:,
//     }
// }))

exports.getlogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errormessage: message,
        oldinput: {
            email: "",
            password: '',
            // confirmpassword: ''
        },
        validationErrors: []

    });
};

exports.getsignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'signup',
        errormessage: message,
        oldinput: {
            email: "",
            password: '',
            confirmpassword: ''
        },
        validationErrors: []

    })
}

exports.postlogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.render('auth/login', {
            path: '/login',
            pageTitle: 'login',
            errormessage: errors.array()[0].msg,
            oldinput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        })
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                // req.flash('error', 'invalid email or password.')
                return res.render('auth/login', {
                    path: '/login',
                    pageTitle: 'login',
                    errormessage: 'invalid email or password.',
                    oldinput: {
                        email: email,
                        password: password
                    },
                    validationErrors: []
                })
                // return res.redirect('/login');
            }

            bcrypt.compare(password, user.password)
                .then(doMatch => {

                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });

                    }
                    return res.render('auth/login', {
                        path: '/login',
                        pageTitle: 'login',
                        errormessage: 'invalid email or password.',
                        oldinput: {
                            email: email,
                            password: password
                        },
                        validationErrors: []
                    })
                }).catch(err => {
                    // console.log('/logim')
                    res.redirect('/login')
                })


        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postsignup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'signup',
            errormessage: errors.array()[0].msg,
            oldinput:
            {
                email: email,
                password: password,
                confirmpassword: req.body.confirmpassword
            },
            validationErrors: errors.array()
        })
    }

    bcrypt.hash(password, 12)


        .then(hashpassword => {
            const user = new User({
                email: email,
                password: hashpassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');

            // return transporter.sendMail({


            //     to: email,
            //     from: 'shop@node-complete.com',
            //     subject: 'Signup successfully',
            //     html: '<h1>you successfully signed up!</h1>'
            // })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            // console.log(err);
            return next(error);
        })

}

exports.postlogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};


exports.getreset = (req, res, next) => {
    let message = req.flash('error');

    res.render('auth/reset', {
        path: 'reset',
        pageTitle: 'Reset password',
        errormessage: message
    })
}

exports.postreset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    req.flash('error', 'no account with that email found.');
                    return res.redirect('/reset');
                }
                user.resettoken = token;
                user.resettokenexpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/')
                transporter.sendMail({
                    to: req.body.email,
                    from: 'shop@node-complete.com',
                    subject: 'Password reset',
                    html: `
                    <p>you requested a password reset</p>
                     <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>

                    `
                })
            })


            .catch((err) => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    });
};

exports.getnewpassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resettoken: token, resettokenexpiration: { $gt: Date.now() } })
        .then((user) => {
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0];
            }
            else {
                message = null;
            }
            res.render('auth/new-password', {
                path: '/new-password',
                pageTitle: 'new password',
                errormessage: message,
                userid: user._id.toString(),
                passwordtoken: token
            });

        }).catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });


};

exports.postnewpassword = (req, res, next) => {
    const newpassoword = req.body.password;
    const userid = req.body.userid;
    const passwordtoken = req.body.passwordtoken;

    User.findOne({
        resettoken: passwordtoken,
        resettokenexpiration: { $gt: Date.now() },
        _id: userid,
    })
        .then((user) => {
            resetuser = user
            return bcrypt.hash(newpassoword, 12)


        }).then((hashedpassword) => {
            resetuser.password = hashedpassword;
            resetuser.resettoken = undefined;
            resetuser.resettokenexpiration = undefined;
            return resetuser.save();

        })
        .then(result => {
            res.redirect('/login')
        })

        .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

}
