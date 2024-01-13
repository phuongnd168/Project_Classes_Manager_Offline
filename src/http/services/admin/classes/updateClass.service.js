const model = require("../../../../models/index");
const setCalendar = require("../../../../utils/setCalendar");
const Class = model.Class;
const User = model.User;
const ClassSchedule = model.classes_schedule;

module.exports = async (data, idClass, idTeacher, schedule, startDate, endDate, timeLearnStart) => {
  const classUpdate = await Class.findOne({ where: { id: idClass } });
  classUpdate.setUsers(await User.findOne({ where: { id: idTeacher } }));
  await Class.update(data, { where: { id: idClass } });
  if (typeof schedule === "string") {
    setCalendar(startDate, endDate, +schedule, idClass, idTeacher, timeLearnStart)
    await ClassSchedule.destroy({where:{classId: idClass}})
    await ClassSchedule.create({ classId: idClass, schedule: +schedule });
  } else {
    schedule.forEach(async (element) => {
      setCalendar(startDate, endDate, +element, idClass, idTeacher, timeLearnStart)
      await ClassSchedule.destroy({where:{classId: idClass}})
      await ClassSchedule.create({ classId: idClass, schedule: +element });
    });
  }
};
