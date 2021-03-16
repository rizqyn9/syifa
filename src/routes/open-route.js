const route = require('express').Router()
const Kategori = require('../models/category')
const InAktif = require('../models/inaktif')
const {AdminOrAuthor} =require('../middlewares/AuthorAuth')

route.get('/:kode', AdminOrAuthor ,async (req,res,next) => {
    try {
        const kode = req.params.kode
        const kategoriData = await Kategori.findOne({Kode : kode})
        // console.log(kode)
        // console.log(req.session.user.id)
        const allData = await InAktif.find({Kode : kode})
        // console.log(allDataNoFilter);
        // console.log(allData);
        // console.log(allData.length);
        const alertMessage = req.flash("alertMessageOpen");
        const alertStatus = req.flash("alertStatusOpen");
        const alertOpen = { message: alertMessage, status: alertStatus };
        // console.log("===================================" +kategoriData)
        res.render('pages/detail',{
            // AuthorID : 
            AuthorName : req.AuthorName,
            userDetail : req.session.user,
            kode : kode,
            admin : req.body.Admin,
            title : `Inaktif`,
            subTitle : kategoriData.Nama,
            nav : "inaktif",
            alertOpen,
            kategori : kategoriData,
            list    : allData
        })
    } catch (error) {
        console.log(error)
    }
})

//  Update Sub _ Kategori
route.post('/data/:id', async (req,res,next) => {
    const {id} =req.params
    console.log(req.body);
    await console.log(req.body);
    try {
        await Kategori.findByIdAndUpdate(id,req.body,{useFindAndModify:true})
        .then(data => {
            if(!data){
                console.log("gagal");
                req.flash("alertMessageOpen", "Gagal menambah data\n")
                req.flash("alertStatusOpen", "fail")
                res.status(401).redirect(`/open/${req.body.Kode}`)
            } else {
                console.log("Sukses");
                req.flash("alertMessageOpen", "Berhasil menambahkan daftar baru")
                req.flash("alertStatusOpen", "success")
                res.status(201).redirect(`/open/${req.body.Kode}`)
            }
        })
    } catch (error) {
        console.log(error);
        req.flash("alertMessageOpen", "Gagal menambah data\n Server Error")
        req.flash("alertStatusOpen", "fail")
        res.status(401).send('gagal')
    }
})

module.exports = route