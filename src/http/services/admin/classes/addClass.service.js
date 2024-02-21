const model = require("../../../../models/index");
const getEndDate = require("../../../../utils/getEndDate");
const setCalendar = require("../../../../utils/setCalendar");
const Class = model.Class;
const ClassSchedule = model.classes_schedule;
const Course = model.Course
const User = model.User;
module.exports = async (data, teacherId, schedule, startDate, timeLearnStart) => {


  const course = await Course.findOne({
    where: {
      id: data.courseId
    }
  })

  const teacher = await User.findOne({
    where: {
      id: teacherId
    }
  })
  
  const endDate = await getEndDate(startDate, course.id, schedule)
  data.endDate = endDate.setDate(endDate.getDate() - 1)
  const newClass = await Class.create(data);
  newClass.addUser(teacher);

  if (typeof schedule === "string") {
    setCalendar(startDate, endDate.setDate(endDate.getDate() - 1), +schedule, newClass.id, teacherId, timeLearnStart)
    await ClassSchedule.create({ classId: newClass.id, schedule: +schedule });
    
  } else {
  
    schedule.forEach(async (element) => {
      setCalendar(startDate, endDate.setDate(endDate.getDate() - 1), +element, newClass.id, teacherId, timeLearnStart)
      await ClassSchedule.create({ classId: newClass.id, schedule: +element });
    });
  }
};
