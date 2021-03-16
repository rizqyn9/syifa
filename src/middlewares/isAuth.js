module.exports = {
    auth: (req,res,next) => {
        // console.log(req)
        const sessUser = req.session.user;
        // console.log(req.session.user);
        if (sessUser) {
            // console.log("===============\n",sessUser)
            if(sessUser.isAdmin == "true"){
                req.body.Admin = true
                // console.log("This admin");
                res.status(200)
            } else {
                req.body.Admin = false
                // console.log("Member")
                res.status(200)
            }
            return next() 
        } else {
            req.session.error = "You must login first"
            return res.status(401).redirect("/auth");
        }
    },
}