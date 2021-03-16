const User = require('../models/user')
const {signUpValidate,logInValidate} = require('../config/Joi-Validate')
const moment = require('moment')

exports.Get_auth = (req,res,next) => {
    // console.log(req.session);
    let error = req.session.error
    delete req.session.error;
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render('pages/login',{
        alert,
        err : error
    })
}

exports.Post_login = async (req,res,next) => {
    const {error} = logInValidate(req.body)
    if(error) return res.status(401).send(error.details[0])
    // ! Check database
    try {
        let name = req.body.name
        let password = req.body.password

        let user = await User.findOne({name: name}).exec()
        if(!user) {
            req.flash("alertMessage", "Username atau password salah")
            req.flash("alertStatus", "fail")
            return res.status(401).redirect('/auth')
        } 
        // console.log('====================================');
        // console.log(user);
        // console.log('====================================');
        let passCheck = await user.validPassword(password)
        if(!passCheck) return req.session.error = "Wrong Password"
        console.log(`User log in : ${name} as ${user}`);
        req.session.user = {
            name        : user.name,
            profile     : user.profile,
            isAuth      : true,
            isAdmin     : user.is_Admin,
            id          : user.id,
            email       : name
        }
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.send("error")
    }
}

exports.Post_signup = async (req,res,next) => {
    const {error} = signUpValidate(req.body)
    if(error) return res.status(401).send(error.details[0].message)
    // ! Save to database
    try {
        const user      = new User
        user.name       = req.body.name
        user.email      = req.body.email
        user.password   = user.encryptPassword(req.body.password)
        user.is_Admin   = req.body.is_Admin
        // console.log(user);
        user.created_At = Date.now()
        user.Created_Moment= moment().format('MMMM Do YYYY, h:mm:ss a')
        user.save((err, result) => {
            if (err) {
                console.log(err)
                req.flash("alertMessage", "Gagal mendaftarkan anggota baru. Email  atau username telah digunakan.")
                req.flash("alertStatus", "fail")
                res.status(401).redirect('/admin')
            } else {
                console.log("New User Registered")
                req.flash("alertMessage", "Berhasil menambahkan anggota baru")
                req.flash("alertStatus", "success")
                // console.log(result);
                res.status(201).redirect('/admin')
            }
        })

    } catch (error) {
        console.log(error);
        req.flash("alertMessage", "Gagal menambahkan anggota baru. Server error")
        req.flash("alertStatus", "fail")
        res.status(501).redirect('/admin')
    }
    
}

exports.Log_Out = (req,res,next) => {
    req.session.destroy((err) => {
        // delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie("session-id"); // clears cookie containing expired sessionID
        res.redirect('/auth')
    });
}


exports.Get_login = (req,res,next) => {
    res.status(200).send("Login Area")
}

exports.Get_signup = (req,res,next) => {
    res.render('pages/signup')
}