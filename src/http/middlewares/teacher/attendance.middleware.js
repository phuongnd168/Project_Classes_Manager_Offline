const model = require("../../../models/index")
const {Op} = require("sequelize")
const Class = model.Class

const User = model.User
module.exports = async (req, res, next) => {
    const {classId} = req.params
    const {id} = req.user
    const classes = await Class.findAll({
        where: {
          teacherId: id
        }
    });
    const data = classes.map(c => {
        return c.id
    });
    if(!data.includes(+classId)){
        req.flash("error", "Không tồn tại")
        res.redirect("/teacher/manager/classes")
        return
    }
    next()
}; 
  