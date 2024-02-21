const model = require("../../../models/index")
const {Op} = require("sequelize")

const StudentClass = model.students_class;
module.exports = async (req, res, next) => {
    const {id, classId} = req.params

    const student = await StudentClass.findOne({
        where: {
            [Op.and]: [{classId}, {studentId: id}]
        }
    })
    
    if(!student){
        req.flash("error", "Không tồn tại")
        res.redirect(`/teacher/manager/students`)
        return
    }
    next()
}; 
  