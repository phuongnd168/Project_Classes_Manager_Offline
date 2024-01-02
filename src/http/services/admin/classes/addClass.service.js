const model = require("../../../../models/index");
const Class = model.Class;
const ClassSchedule = model.classes_schedule;
const User = model.User;
module.exports = async (data, idTeacher, schedule) => {
  const newClass = await Class.create(data);
  newClass.addUser(await User.findOne({ where: { id: idTeacher } }));
  if (typeof schedule === "string") {
    await ClassSchedule.create({ classId: newClass.id, schedule: +schedule });
  } else {
    schedule.forEach(async (element) => {
      await ClassSchedule.create({ classId: newClass.id, schedule: +element });
    });
  }
};
