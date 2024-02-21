const model = require("../../../models/index")

const getCourseService = require("../../services/student/courses/getCourse.service");


module.exports = async (req, res, next) => {
    const {id} = req.params
    const courses = await getCourseService(req.user.id)
    const data = courses.map(course => {
        return course?.Class?.Course["id"]
    });
    if(!data.includes(+id)){
        req.flash("error", "Không tồn tại")
        res.redirect("/courses")
        return
    }
    next()
}; 
  