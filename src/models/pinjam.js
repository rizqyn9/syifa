const mongoose = require('mongoose')

const Pinjam = new mongoose.Schema({
    Kode_Kategori : {
        type: Number
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
        type: Number
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
