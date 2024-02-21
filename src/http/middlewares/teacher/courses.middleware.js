const model = require("../../../models/index")
const {Op} = require("sequelize")
const Course = model.Course
const Class = model.Class
module.exports = async (req, res, next) => {
    const {id} = req.params
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
    if(!data.includes(+id)){
        req.flash("error", "Không tồn tại")
        res.redirect("/teacher/manager/courses")
        return
    }
    next()
}; 
  