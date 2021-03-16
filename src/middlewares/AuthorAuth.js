const Kategori = require('../models/category')
const User = require('../models/user')
module.exports = {
    AdminOrAuthor : async (req,res,next) => {
        try {
            // Jika Member non Author Redirect
            // Jika Admin next
            // Jika Member = Author next
    
            //  Check name from username
            const kategoriData = await Kategori.findOne({Kode : req.params.kode})
            // console.log(kategoriData);
            // console.log(req.session.user.id);

            // Check name Author 
            const Author = await User.findById(kategoriData.Author)
            const AuthorName = Author.name
            if(kategoriData.Status == "Unlocked"){
                console.log("Unlocked");
                req.AuthorName = AuthorName
                return next()
            }
            if(req.body.Admin){
                req.AuthorName = AuthorName
                // console.log("Admin");
                return next()
            } else if (req.session.user.id == kategoriData.Author){
                req.AuthorName = AuthorName
                // console.log("Author");
                return next()
            } else {
                req.flash("alertMessage", "Akses Ditolak")
                req.flash("alertStatus", "fail")
                return res.status(401).redirect('/kategori')
            }
            
        } catch (error) {
            console.log(error);
            req.flash("alertMessage", "Server sedang gangguan")
            req.flash("alertStatus", "fail")
            res.status(501).redirect('/kategori')
        }
    }
}