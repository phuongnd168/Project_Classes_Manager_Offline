const model = require("../../../../models/index");
const setCalendar = require("../../../../utils/setCalendar");
const Class = model.Class;
const ClassSchedule = model.classes_schedule;

const User = model.User;
module.exports = async (data, idTeacher, schedule, startDate, endDate, timeLearnStart) => {
  const newClass = await Class.create(data);
  newClass.addUser(await User.findOne({ where: { id: idTeacher } }));
  if (typeof schedule === "string") {
   
    setCalendar(startDate, endDate, +schedule, newClass.id, idTeacher, timeLearnStart)
    await ClassSchedule.create({ classId: newClass.id, schedule: +schedule });
    
  } else {
  
    schedule.forEach(async (element) => {
      setCalendar(startDate, endDate, +element, newClass.id, idTeacher, timeLearnStart)
      await ClassSchedule.create({ classId: newClass.id, schedule: +element });
    });
  }
};
