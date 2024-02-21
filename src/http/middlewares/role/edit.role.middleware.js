const model = require("../../../models/index")
const Role = model.Role
module.exports = async (req, res, next) => {
    const {id} = req.params
    const role = await Role.findByPk(id)
    if(!role){
        req.flash("error", "Không tồn tại")
        res.redirect("/admin/manager/role")
        return
    }
    next()
};
