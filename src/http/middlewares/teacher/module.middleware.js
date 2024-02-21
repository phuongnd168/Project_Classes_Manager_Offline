const model = require("../../../models/index")
const {Op} = require("sequelize")

const CourseModule = model.course_module;

module.exports = async (req, res, next) => {
    const {idModule, id} = req.params
    const courseModule = await CourseModule.findOne({
        where: {
            [Op.and]: [{courseId: id}, {id: idModule}]
        }
    })
    
    if(!courseModule){
        req.flash("error", "Không tồn tại")
        res.redirect(`/teacher/manager/courses`)
        return
    }
    next()
}; 
  