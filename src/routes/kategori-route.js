const route = require('express').Router()
const Kategori = require('../models/category')
const InAktif = require('../models/inaktif')

route.get('/',  async (req,res,next) => {
    // Kategori DB ke 1
    // InAktif DB ke 2
    // DB 1 akan mengembalikan beberapa document beserta kode yang tersimpan
    //  Kode yang tersimpan tersebut bakal di hitung total documentnya
    const alertMessage = await req.flash("alertMessage");
    const alertStatus =await  req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    let data = await Kategori.find()
    const total = Promise.all(await data.map(async el => {
        // console.log(el.Kode)
        const inaktif = await InAktif.countDocuments({Kode: el.Kode})
        // console.log(inaktif);
        el.Total_Data = inaktif
        // console.log(el);
        return el
    }))
    // console.log(total);
    total.then(el => {
        res.status(200).render('pages/kategori', {
            alert:alert,
            userDetail : req.session.user,
            admin : req.body.Admin,
            title : "Arsip Inaktif",
            nav : "inaktif",
            list : el
        })
    })
})

route.post('/', async (req,res,next) => {
    try{
        // Check same Code
        // console.log(req.body);
        // console.log(req.session)
        // console.log('====================================');
        // console.log(req.body);
        // console.log('====================================');
        const {Kode, Nama, Status, Admin,Tahun } = req.body
        const kategori = new Kategori
        kategori.ODP        = "ODP/Dinas Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
        kategori.Author     = req.session.user.id,
        kategori.Kode       = Kode,
        kategori.Nama       = Nama,
        kategori.Status       = Status,
        kategori.Tahun      = Tahun,
        kategori.Date_Created = Date.now()
        kategori.Last_Modified = Date.now()

        await kategori.save((err,result) => {
            if(err){
                req.flash("alertMessage", "Gagal menambahkan kategori.\nKode klasifikasi sudah terpakai")
                req.flash("alertStatus", "fail")
                res.status(501).redirect('/kategori')
            } else {
                // console.log(`added new category from ${req.session.user.email}`)
                req.flash("alertMessage", "Berhasil menambahkan kategori baru")
                req.flash("alertStatus", "success")
                res.redirect('/kategori')
            }
        })
    } catch (err){
        req.flash("alertMessage", "Gagal menambah kategori\nKode klasifikasi sudah terpakai")
        req.flash("alertStatus", "fail")
        res.status(501).redirect('/kategori')
    }
})

route.get('/delete/:kode', async(req,res,next) => {
    let kode = req.params.kode
    Kategori.findOneAndDelete({Kode: kode})
    .then(data => {
        if(!data){
            console.log("Gagal hapus kategori");
            req.flash("alertMessage", "Gagal hapus")
            req.flash("alertStatus", "fail")
            res.status(401).redirect(`/kategori/open/${kode}`)
        } else {
            // console.log(data);
            // console.log("Sukses delete kategori")
            req.flash("alertMessage", `Berhasil hapus ${data.Nama}`)
            req.flash("alertStatus", "success")
            res.status(200).redirect('/kategori')
        }
    }).catch (err => {
       console.log(err)
       req.flash("alertMessage", "Gagal hapus, server erro")
       req.flash("alertStatus", "fail") 
       res.status(501).redirect(`/kategori/open/${kode}`)
    })
})

module.exports = route