const Users = require('../models/user')

module.exports = {
    Get_allData : async (req,res,next) => {
        try {
            const allData   = await Users.find()
            let dataMember  = []
            let dataAdmin   = []
            allData.map(el => {
                if(el.is_Admin == 'true'){
                    dataAdmin.push(el)
                } else {
                    dataMember.push(el)
                }
            })

            // console.log("Member : "+dataMember + '\n' +"Admin: " + dataAdmin);
            const alertMessage = await req.flash("alertMessage");
            const alertStatus =await  req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus };
            res.render('pages/admin',{
                alert,
                userDetail : req.session.user,
                admin       : req.body.Admin,
                nav         : "admin",
                title       : "Menu Admin",
                dataMember  : dataMember,
                dataAdmin   : dataAdmin,
            })
        } catch (error) {
            console.log(error)
        }
    },
}