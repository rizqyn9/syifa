const route = require('express').Router()


route.get('/', (req,res,next)=> {
    console.log("Inaktif");
    res.json({
        "data":"hasdads"
    })
})
route.post('/', (req,res,next) => {
    console.log(req.body)
    res.status(201)
})

module.exports = route