const model = require("../../../../models/index");
const Class = model.Class;
const User = model.User;
const ClassSchedule = model.classes_schedule;
const Course = model.Course;
module.exports = async (filters, limit, offset) => {
  return await Class.findAll({
    where: filters,
    include: [{ model: User }, { model: ClassSchedule }, {model: Course}],
    limit,
    offset,
   
  });
};
