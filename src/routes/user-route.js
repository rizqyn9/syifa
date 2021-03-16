const route = require('express').Router()

route.get('/:id', (req,res,next) => {
    res.render('pages/user', {
    userDetail : req.session.user,
    admin : req.body.Admin,
    title : "User",
    nav : "user"
    })
})


module.exports = route