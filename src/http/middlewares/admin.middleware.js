
module.exports = async (req, res, next) => {
    if(req.user?.typeId !== 1){
        res.redirect("/auth/login")
        return
    }
next()
}
    