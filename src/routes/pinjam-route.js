const route =require('express').Router()
const pinjam = require('../models/pinjam')
const Inaktif = require('../models/inaktif')
const {DateTime} = require('luxon')
const inaktif = require('../models/inaktif')


route.get('/', async (req,res,next) => {
    const data = await pinjam.find()
    // console.log(data);
    res.render('pages/pinjam',{
        AuthorName : req.AuthorName,
        userDetail : req.session.user,
        admin : req.body.Admin,
        title : `Data Peminjam`,
        nav : "pinjam",
        data : data
    })
})

route.post('/', async (req,res,next) => {
    console.log(req.body);
    try {
        await Inaktif.findOneAndUpdate(req.body.idData,{Pinjam: true})
                .then(data => {
                    if(!data) {
                        return res.status(502).send("Gaga;")
                    } else {
                        console.log("Success");
                    }
                }).catch(err => {
                    console.log(err);
                })
        const Pinjam = new pinjam({
            ...req.body,
                Lokasi_Simpan : {
                    Rak : req.body.Rak,
                    Boks: req.body.Boks
                },
                Tanggal : DateTime.now().toFormat('MM-dd-yyyy')
        })
        await Pinjam.save((err, result ) => {
            if(err) {
                console.log(err);
                res.status(502).send("Gaga;")
            } else {
                console.log(result);
                res.redirect('/pinjam')
            }
        }).catch(err => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }    
})

/*
    Terdapat 2 Colletion DB => Pinjam & Inaktif
            Pinjam = {
                idInaktif    
            }
    - Tujuan hapus data di Colletion Pinjam
    - Ambil codeID dari Pinjam
    - Lalu ubah query di Col Inaktif
    - Lanjut delete id Pinjam
*/

route.post('/delete', async (req,res,next) => {
    try {
        const target  = (typeof req.body.data !=  "string") ? req.body.data : [req.body.data]

        const done = Promise.all(await target.map(async el => {
            pinjam.findByIdAndDelete(el).then(data => {
                    // console.log(data);
                    Inaktif.findByIdAndUpdate(data.idData, {Pinjam : false}).then(()=> {
                        return "Success"
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                })
            }))
            
            done.then(el => {
                console.log(el);
                res.redirect('/pinjam')
            }).catch(err => {
                console.log(err);
                res.status(501).redirect('/pinjam')
            })
            
        } catch (error) {
            console.log(error);   
            res.status(501).redirect('/pinjam')
    }
})



module.exports= route 