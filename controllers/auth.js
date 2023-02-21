const User = require('../models/user')
const mongoDB = require('../database/mongodb')

let email = null;

const getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    });
};

const postLogin = (req, res, next) => {
    // console.log(req.body)
    email = req.body.email;
    const password = req.body.password;
    console.log('Inside postlogin')
    // console.log(email, password)
    //query the DB for the credentials
    User.findUser(email, password).then(user => {
        if(user){
            // console.log(user.name)
            // console.log('hiii')
            // console.log(user)
            req.session.user = user;
            return req.session.save(err => {
                res.redirect('dashboard');
            })
        }else{
            // console.log(user)
            res.render('auth/login', {
                pageTitle: 'Login',
                msg: 'Invalid Credentials'
            })
        }
    }).catch(err => console.log(err));
};

const getRegister = (req, res, next) => {
    res.render('auth/register', {
        pageTitle: 'Register'
    })
};

const postRegister = (req, res, next) => {
    // console.log(req.body);
    const name = req.body.name;
    email = req.body.email;
    const password = req.body.password;
    console.log('Inside postRegister')
    console.log(name, email, password);
    const user = new User(name, email, password);
    user.save().then(user => {
        console.log(user);
        console.log('User saved in DB');
    }).catch(err => console.log(err));
    res.redirect('/');
}

const getLogout = (req, res, next) => {
    if(req.session.user){
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.redirect('/');
    }
}

const getDashboard = (req, res, next) => {
    console.log(req.session.user)
    res.render('auth/dashboard', {
        pageTitle: 'Dashboard',
        name: req.session.user.name
    })
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getDashboard,
    getLogout
}