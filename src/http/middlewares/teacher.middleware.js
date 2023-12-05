
module.exports = async (req, res, next) => {
    if(req.user?.typeId !== 2){
        res.redirect("/auth/login")
        return
    }
next()
}
    