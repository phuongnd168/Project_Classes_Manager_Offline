const model = require("../../../models/index")
const {Op} = require("sequelize")

const User = model.User;
module.exports = async (req, res, next) => {
    const {id} = req.params

    const teacher = await User.findOne({
        where: {
            [Op.and]: [{id}, {typeId: 2}]
        }
    })
    
    if(!teacher){
        req.flash("error", "Không tồn tại")
        res.redirect(`/admin/manager/teachers`)
        return
    }
    next()
}; 
  