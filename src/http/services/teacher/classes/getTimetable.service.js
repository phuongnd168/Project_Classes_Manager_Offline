const model = require("../../../../models/index");
const TeacherCalendar = model.teacher_calendar;
const Class = model.Class;
module.exports = async (teacherId) => {
  return await TeacherCalendar.findAll({where: {teacherId}, include: Class });
};
