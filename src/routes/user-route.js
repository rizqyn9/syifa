const route = require('express').Router()
const User = require('../models/user')

route.get('/:id', (req,res,next) => {
    const alertMessage = req.flash("userAlert");
    const alertStatus = req.flash("userStatus");
    const alert = { message: alertMessage, status: alertStatus };
    console.log(req.session.user);
    res.render('pages/user', {
        alert,    
        userDetail : req.session.user,
        admin : req.body.Admin,
        title : "User",
        nav : "user"
    })
})

route.post('/:id', (req,res,next) => {
    try {
        // console.log(req.params.id);
        // console.log(req.body);
        User.findByIdAndUpdate(req.params.id,{...req.body},(err,result) => {
            if(err){
                console.log(err);
                res.status(501).redirect(`/user/${req.params.id}`)
            } else {
                result.password = result.encryptPassword(req.body.password)
                result.save((err,data) => {
                    if(err){
                        req.flash("userAlert",'Gagal memperbarui data');
                        req.flash("userStatus",'fail');
                        res.status(501).redirect(`/user/${req.params.id}`)
                    } else {
                        req.flash("userAlert",'Berhasil memperbarui data');
                         req.flash("userStatus",'success');
                        res.status(201).redirect(`/user/${req.params.id}`)
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
        req.flash("userAlert",'Tidak dapat memperbarui data');
        req.flash("userStatus",'fail');
        res.status(501).redirect(`/user/${req.params.id}`)
    }
})


module.exports = route