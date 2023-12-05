
module.exports = async (req, res, next) => {
        if(req.user?.typeId !== 3){
            res.redirect("/auth/login")
            return
        }
    next()
}
        