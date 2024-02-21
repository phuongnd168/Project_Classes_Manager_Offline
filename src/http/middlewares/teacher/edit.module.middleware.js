const model = require("../../../models/index")
const {Op} = require("sequelize")
const ModuleDocument = model.module_document;
const CourseModule = model.course_module;
const Course = model.Course
const Class = model.Class
module.exports = async (req, res, next) => {
    const {idModule, id} = req.params
    const courses = await Course.findAll({
        include: {
            model: Class,
            where: {
              teacherId: req.user.id
            }
        }
    });
    const data = courses.map(course => {
        return course.id
    });
    const courseModule = await CourseModule.findAll({
        where: {
            courseId: {[Op.in]: data }
        }
    })
    const modules = courseModule.map(module => {
        return module.id
    });
    const moduleDocument = await ModuleDocument.findOne({
        where: {
            [Op.and]: [{moduleId: {[Op.in]: modules }}, {id: idModule}]
        }
    })
    
    if(!moduleDocument){
        req.flash("error", "Không tồn tại")
        res.redirect(`/teacher/manager/courses`)
        return
    }
    next()
}; 
  