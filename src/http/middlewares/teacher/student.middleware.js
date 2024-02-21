const model = require("../../../models/index")
const {Op} = require("sequelize")
const Class = model.Class;
const User = model.User;
const StudentClass = model.students_class;
module.exports = async (req, res, next) => {
    const {id} = req.params
    const classes = await Class.findAll({
        where: {
          teacherId: req.user.id
        },
    });
    const data = classes.map(c => {
        return c.id
    });
  
    const student = await StudentClass.findOne({
        where: {
            [Op.and]: [{classId: {[Op.in]: data }}, {studentId: id}]
        }
    })
    
    if(!student){
        req.flash("error", "Không tồn tại")
        res.redirect(`/teacher/manager/students`)
        return
    }
    next()
}; 
  