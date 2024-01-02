const model = require("../../../../models/index");
const Class = model.Class;
const User = model.User;
const ClassSchedule = model.classes_schedule;
module.exports = async () => {
  return await Class.findAll({
    include: [{ model: User }, { model: ClassSchedule }],
  });
};
