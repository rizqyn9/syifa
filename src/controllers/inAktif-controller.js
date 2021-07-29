const InAktif = require('../models/inaktif')
const {generate_Form} = require('../render/form-render')

module.exports= {
    Get_inaktif_kode : (req,res,next) => {
        const kode = req.params.kode
        res.status(200).render('pages/inaktif',{
            userDetail : req.session.user,
            kode: kode,
            subTitle: kode,
            admin : req.body.Admin,
            nav : 'inaktif',
            title : "Input Data",
            Submit : "/inaktif/post"
        })
        console.log(`Kode : ${kode}`);
    },
    Get_inaktif : (req,res,next) =>{
        res.status(200).render('pages/inaktif',{
            userDetail : req.session.user,
            admin : req.body.Admin,
            nav : 'inaktif',
            title : "Input Data",
        })
        console.log("data");
    },
    Post_data: async (req, res, next) => {
        // console.log(req.session.user);
        try {
            const {
                Bulan,
                Tahun,
                No_Definitif,
                Kode_Klasifikasi,
                Isi_Berkas,
                Aktif,
                Inaktif,
                Keterangan_JRA,
                Nilai_Guna,
                Media,
                Jumlah_Value,
                Jumlah_Jenis,
                Tingkat_Perkembangan,
                Lokasi_Simpan_Rak,
                Lokasi_Simpan_Boks,
                Kode
            } = req.body
            // console.log(req.body);

            const inAktif = new InAktif        
            inAktif.Kode                            = Kode
            inAktif.Properties.Author       = req.session.user.email
            inAktif.Properties.Bulan        = Bulan
            inAktif.Properties.Tahun        = Tahun
            inAktif.No_Definitif            = No_Definitif
            inAktif.Kode_Klasifikasi        = Kode_Klasifikasi
            inAktif.Isi_Berkas                  = Isi_Berkas
            inAktif.Retensi_JRA.Aktif       = Aktif
            inAktif.Retensi_JRA.Inaktif     = Inaktif
            inAktif.Keterangan_JRA          = Keterangan_JRA
            inAktif.Nilai_Guna              = Nilai_Guna
            inAktif.Media                   = Media
            inAktif.Jumlah.Jumlah_Value     = Jumlah_Value
            inAktif.Jumlah.Jumlah_Jenis     = Jumlah_Jenis
            inAktif.Tingkat_Perkembangan    = Tingkat_Perkembangan
            inAktif.Lokasi_Simpan.Rak       = Lokasi_Simpan_Rak
            inAktif.Lokasi_Simpan.Boks      = Lokasi_Simpan_Boks
            inAktif.Korektor.User_Name      = req.session.user.email
            inAktif.Korektor.Last_Edit      = Date.now()
            inAktif.Upload_File             = "/public"
            inAktif.Date_Created            = Date.now()
            inAktif.Pinjam          = false

            inAktif.save((err, result) => {
                if(err) {
                    req.flash("alertMessageOpen", "Gagal menambah data\n")
                    req.flash("alertStatusOpen", "fail")
                    console.log(err);
                    res.status(401).redirect(`/open/${Kode}`)
                }else{
                    console.log("Success input data")
                    req.flash("alertMessageOpen", "Berhasil menambahkan data baru");
                    req.flash("alertStatusOpen", "success");
                    res.redirect(`/open/${Kode}`)
                }
            })
        } catch (error) {
            console.log(error);
            req.flash("alertMessageOpen", "Gagal menambah data\n")
            req.flash("alertStatusOpen", "fail")
            res.status(501).redirect(`/open/${Kode}`)
        }
    },

    Get_AllData : async (req, res, next) => {
        try {
            const allData = await InAktif.find()
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };
            // console.log(allData)
            res.status(200).render('pages/list',
            {
                userDetail : req.session.user,
                // data: generate_Form(allData), 
                admin   : req.body.Admin,
                nav     : "inaktif",
                title   : "List",
                alert,
                list    : allData
            })
        } catch (error) {
            res.status(501).json({
                message: error
            })
        }
    },
    
    Get_test : async (req,res,next) => {
        console.log(req)
        res.send('Okay')
    }

}