const mongoose = require('mongoose')

const Kategori = new mongoose.Schema({
    Author:{
        type:String,
        // required:true
    },
    ODP : {
        type: String
    },
    Kode:{
        type: Number,
        // required: true,
        // unique: true
    },
    Nama : {
        type: String,
        required:true
    },
    Status: {
        type: String,
        required:true
    },
    Total_Data : {
        type: Number,
        default: 0
    },
    Date_Created: {
        type : Date,
        default: Date.now
    },
    Last_Modified: {
        type : Date,
        default: Date.now
    },
    Tahun : {
        type: Number
    }
})

module.exports = mongoose.model('Kategori', Kategori )