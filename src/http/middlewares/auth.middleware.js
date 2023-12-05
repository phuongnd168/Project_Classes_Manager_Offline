module.exports = (req, res, next) => {

    if(!req.user){
        delete req.session.isVerify
        res.clearCookie("user");
        res.redirect("/auth/login")
        return
    }
    next()
}