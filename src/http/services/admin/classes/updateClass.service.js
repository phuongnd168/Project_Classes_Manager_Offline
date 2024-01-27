const model = require("../../../../models/index");
const getEndDate = require("../../../../utils/getEndDate");
const setCalendar = require("../../../../utils/setCalendar");
const Class = model.Class;
const User = model.User;
const ClassSchedule = model.classes_schedule;
const Course = model.Course;
module.exports = async (data, idClass, schedule, startDate, timeLearnStart) => {


  const course = await Course.findOne({
    where: {
      id: data.courseId
    }
  })

  const teacher = await User.findOne({
    where: {
      id: course.teacherId
    }
  })
  const endDate = await getEndDate(startDate, course.id, schedule)
  data.endDate =  endDate.setDate(endDate.getDate() - 1)
  const classUpdate = await Class.findOne({ where: { id: idClass } });
  classUpdate.setUsers(teacher);
  await Class.update(data, { where: { id: idClass } });
  if (typeof schedule === "string") {
    setCalendar(startDate, endDate.setDate(endDate.getDate() - 1), +schedule, idClass, teacher.id, timeLearnStart)
    await ClassSchedule.destroy({where:{classId: idClass}})
    await ClassSchedule.create({ classId: idClass, schedule: +schedule });
  } else {
    schedule.forEach(async (element) => {
      setCalendar(startDate, endDate.setDate(endDate.getDate() - 1), +element, idClass, teacher.id, timeLearnStart)
      await ClassSchedule.destroy({where:{classId: idClass}})
      await ClassSchedule.create({ classId: idClass, schedule: +element });
    });
  }
};
