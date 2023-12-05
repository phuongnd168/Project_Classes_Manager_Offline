
module.exports = async (req, res, next) => {
        if(req.session.status){
            switch (req.user?.typeId) {
                case 1:
                    delete req.session.status
                    res.redirect("/admin/account")
                    break
                case 2:
                    delete req.session.status
                    res.redirect("/teacher/account")
                    break
                case 3:
                    delete req.session.status
                    res.redirect("/account")
                    break
                default:
                    delete req.session.status
                    res.redirect("/auth/login")
                    break
              }
           
            return
        }
    
        if(req.user){
            switch (req.user?.typeId) {
                case 1:
                    res.redirect("/admin")
                    break
                case 2:
                    res.redirect("/teacher")
                    break
                case 3:
                    res.redirect("/")
                    break
                default:
                    res.redirect("/auth/login")
                    break
              }
           
            return
        }
    next()
    
}
        