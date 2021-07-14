const mongoose = require('mongoose')

const Pinjam = new mongoose.Schema({
    Kode_Kategori : {
        type: String
    },
    Bidang : {
        type: String
    },
    Nama : {
        type: String
    },
    Tanggal : {
        type: String
    },
    idData : {
        type: String,
    },
    No_Definitif : {
        type: String
    }, 
    Lokasi_Simpan : {
        Rak : {
            type: Number
        },
        Boks : {
            type: Number
        }
    }, 
    Isi_Berkas :{
        type : String
    },
    Date_Created : {
        type : Date,
        default: Date.now
    }
    
})


module.exports = mongoose.model('Pinjam', Pinjam )
