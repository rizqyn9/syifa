const route = require('express').Router()
const inAktif = require('../models/inaktif')

route.get('/:id',async(req,res,next)=> {
	// console.log(id)
	const id = req.params.id
    try {
        const data = await inAktif.findById(id)
        console.log(data.Properties.Bulan)
        res.render('pages/inaktif', {
            userDetail      : req.session.user,
            admin           : req.body.Admin,
            nav     : "inaktif",
            title : "Edit data",
            id : req.params.id,
            Submit              : `/data/${req.params.id}/${data.Kode}`,
            kode                    : data.Kode,
            Bulan                   : data.Properties.Bulan,
            Tahun                   : data.Properties.Tahun,
            Kode_Klasifikasi : data.Kode_Klasifikasi,
            Date_Created    : data.Date_Created,
            Last_Modified   : data.Last_Modified,
            Author                  : data.Properties.Author,
            No_Definitif        : data.No_Definitif,  
            Isi_Berkas          : data.Isi_Berkas,  
            Inaktif             : data.Retensi_JRA.Inaktif,  
            Aktif               : data.Retensi_JRA.Aktif,  
            Keterangan_JRA      : data.Keterangan_JRA,  
            Nilai_Guna          : data.Nilai_Guna,  
            Media               : data.Media,  
            Jumlah_Value        : data.Jumlah.Jumlah_Value,  
            Jumlah_Jenis        : data.Jumlah.Jumlah_Jenis,  
            Tingkat_Perkembangan: data.Tingkat_Perkembangan,  
            Rak                 : data.Lokasi_Simpan.Rak,  
            Boks                : data.Lokasi_Simpan.Boks,  
            Korektor            : data.Korektor,
            Pinjam              : data.Pinjam
        })            
    } catch (error) {
        console.log(error);
        req.flash("alertMessage", "Tidak dapat menemukan data\n")
        req.flash("alertStatus", "fail")
        res.status(401).redirect('inaktif/list')
    }
})

route.post('/:id/:kode', async (req,res,next) => {
	const {id, kode} = req.params
    const data = await req.body
    const user = await req.session.user.id
    // console.log(req.session.user.id)
    await console.log(data)
    try{
        inAktif.findByIdAndUpdate(id,
            {...data, 
                Properties:{
                    Bulan: data.Bulan,
                    Tahun: data.Tahun
                },
                Retensi_JRA: {
                    Aktif : data.Aktif,
                    Inaktif : data.Inaktif
                },
                Jumlah:{
                    Jumlah_Value : data.Jumlah_Value,
                    Jumlah_Jenis: data.Jumlah_Jenis
                },
                Lokasi_Simpan: {
                    Rak : data.Lokasi_Simpan_Rak,
                    Boks : data.Lokasi_Simpan_Boks
                },
            },
            {useFindAndModify:false})
        .then(data => {
            if(!data){
                console.log("Gagal")
                res.status(401).redirect(`/open/${kode}`)
            } else {
                console.log(`Update data ${id}`)
                req.flash("alertMessageOpen", "Berhasil update data");
                req.flash("alertStatusOpen", "success");
                res.status(201).redirect(`/open/${kode}`)
            }
        }).catch (err => {
            console.log(err);
            res.status(401).redirect(`/open/${kode}`)
        })
    }catch (err){
        res.status(401).redirect(`/open/${kode}`)
        console.log(err);
    }
})

route.get('/delete/:id/:kode',async (req,res,next) => {
    // console.log(req.params.id)
    // console.log(req.params)
    let kode = req.params.kode
    inAktif.findByIdAndDelete(req.params.id)
    .then(data => {
        if(!data){
            console.log("Gagal Hapus");
            req.flash("alertMessageOpen", "Gagal menghapus data\n")
            req.flash("alertStatusOpen", "fail")
            res.status(401).redirect('inaktif/list')
        } else{
            req.flash("alertMessageOpen", "Berhasil menghapus data");
            req.flash("alertStatusOpen", "success");
            res.status(201).redirect(`/open/${kode}`)
        }
    }).catch(err => {
        console.log(err)
        req.flash("alertMessageOpen", "Gagal menghapus data\n")
        req.flash("alertStatusOpen", "fail")
        res.status(401).redirect('inaktif/list')
    })
})

module.exports = route