
module.exports = (req, res, next) => {
    if(req.user && !req.session.sendOtp){
        res.redirect("/")
        return
    }
    if(!req.user){
        res.redirect("/auth/login")
        return
    }
    next()
}
    