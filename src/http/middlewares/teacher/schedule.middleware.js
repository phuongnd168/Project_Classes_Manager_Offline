const model = require("../../../models/index")
const {Op} = require("sequelize")

const TeacherCalendar = model.teacher_calendar;

module.exports = async (req, res, next) => {
    const {classId, dayId} = req.params
    const {id} = req.user
    const schedule = await TeacherCalendar.findOne({
        where: {
            [Op.and]: [{teacherId: id}, {classId}, {id: dayId}]
        }
    })
    if(!schedule){
        req.flash("error", "Không tồn tại")
        res.redirect(`/teacher/manager/classes/${classId}/attendance`)
        return
    }
    next()
}; 
  