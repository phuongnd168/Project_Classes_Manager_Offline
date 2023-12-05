
module.exports = (req) => {
    switch (req.user?.typeId) {
        case 1:
            return "/admin"
        case 2:
            return "/teacher"
        case 3:
            return ""
        default:
            res.redirect("/auth/login")
            break
    }
   
}