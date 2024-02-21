const model = require("../../../../models/index");
const Class = model.Class;
const ClassSchedule = model.classes_schedule;
const Course = model.Course;
const User = model.User;
module.exports = async (filters, limit, offset) => {
  return await Class.findAll({
    where: filters,
    include: [{ model: ClassSchedule }, {model: User}, {model: Course}],
    limit,
    offset,
   
  });
};
