const router = require('express').Router()
const {Get_allData} = require('../controllers/admin-controller')
const Users = require('../models/user')

router.get('/', Get_allData)
router.get('/promote/:id', async(req,res,next) => {
    // console.log(req.params)
    try {
        Users.findByIdAndUpdate(req.params.id, {is_Admin:true},{useFindAndModify:false})
        .then(data => {
            console.log(data)
            if(!data){
                req.flash("alertMessage", "Gagal melakukan aksi")
                req.flash("alertStatus", "fail")
                console.log("Gagal")
                res.status(401).redirect('/admin')
            } else {
                console.log("Success");
                req.flash("alertMessage", "Behasil angkat ke Admin")
                req.flash("alertStatus", "fail")
                res.status(201).redirect('/admin')
            }
        })
    } catch (error) {
        req.flash("alertMessage", "Gagal melakukan aksi")
        req.flash("alertStatus", "fail")
        console.log(error)
        res.status(501).redirect('/admin')
    }
})
router.get('/demote/:id', async(req,res,next) => {
    // console.log(req.params)
    try {
        Users.findByIdAndUpdate(req.params.id, {is_Admin:false},{useFindAndModify:false})
        .then(data => {
            console.log(data)
            if(!data){
                req.flash("alertMessage", "Gagal melakukan aksi")
                req.flash("alertStatus", "fail")
                console.log("Gagal")
                res.status(401).redirect('/admin')
            } else {
                console.log("Success");
                req.flash("alertMessage", "Berhasil menurunkan posisi")
                req.flash("alertStatus", "success")
                res.status(201).redirect('/admin')
                
            }
        })
    } catch (error) {
        console.log(error)
        req.flash("alertMessage", "Gagal melakukan aksi. Server Error")
        req.flash("alertStatus", "fail")
        res.status(501).redirect('/admin')
    }
})
router.get('/delete/:id', async(req,res,next) => {
    // console.log(req.params)
    try {
        Users.findByIdAndDelete(req.params.id)
        .then(data => {
            console.log(data)
            if(!data){
                console.log("Gagal")
                req.flash("alertMessage", "Gagal melakukan aksi.")
                req.flash("alertStatus", "fail")
                res.status(401).redirect('/admin')
            } else {
                console.log("Success");
                req.flash("alertMessage", "Berhasil menghapus data user")
                req.flash("alertStatus", "success")
                res.status(201).redirect('/admin')
                
            }
        })
    } catch (error) {
        console.log(error)
        req.flash("alertMessage", "Gagal melakukan aksi. Server Error")
        req.flash("alertStatus", "fail")
        res.status(501).redirect('/admin')       
    }
})

module.exports = router