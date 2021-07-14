const mongoose = require('mongoose')

const InAktif = new mongoose.Schema({
    Kode : {
        type: String,
    },
    Properties:{
        Author:{
            type:String,
        },
        Bulan:{
            type: String,
        },
        Tahun:{
            type: String,
            required: true
        }
    },
    No_Definitif : {
        type:String,
        required: true
    },
    Kode_Klasifikasi:{
        type:String,
    },
    Isi_Berkas: {
        type : String,
    },
    Retensi_JRA: {
        Aktif : {
            type: String
        },
        Inaktif : {
            type: String
        }
    },
    Keterangan_JRA: {
        type : String,
    },
    Nilai_Guna: {
        type : String,
    },
    Media: {
        type : String,
    },
    Jumlah:{
        Jumlah_Value : {
            type:String
        },
        Jumlah_Jenis: {
            type: String
        }
    },
    Tingkat_Perkembangan: {
        type : String,
    },
    Lokasi_Simpan: {
        Rak : {
            type : String,
        },
        Boks : {
            type : String,
        }
    },
    Date_Created: {
        type : Date,
        default: Date.now
    },
    Last_Modified: {
        type : Date,
        default: Date.now
    },
    Korektor: [
        {
            User_Name : {
                type: String,
            },
            Last_Edit : {
                type: Date,
                default: Date.now
            }
        }
    ],
    Upload_File : {
        type:String
    },
    Pinjam : {
        type: Boolean
    }
})

module.exports = mongoose.model('InAktif', InAktif)