const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Users = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    profile : {
        type: String,
        default: "default"
    },
    created_At: {
        type : Date,
        default: Date.now
    },
    is_Admin: {
        type: String,
        required:true
    },
    Created_Moment: {
        type: String
    }
})

Users.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null)
}
Users.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Users.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.password));
// };

module.exports = mongoose.model('User',Users)