const model = require("../../../models/index")
const User = model.User
const {Op} = require("sequelize")
module.exports = async (req, res, next) => {
    const {id} = req.params
    const user = await User.findOne({
        where: {
            [Op.and]: [{id}, {typeId: 1}]
        }
    })
    if(!user){
        req.flash("error", "Không tồn tại")
        res.redirect("/admin/manager/role/authorization/users")
        return
    }
    next()
};