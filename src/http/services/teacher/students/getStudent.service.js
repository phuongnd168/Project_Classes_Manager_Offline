const model = require("../../../../models/index");
const User = model.User;
const StudentClass = model.students_class;
const Class = model.Class;
const Course = model.Course;
module.exports = async (filters, limit, offset) => {
  return await User.findAll({
    where: filters,
    limit,
    offset,
    include: [
      {model: StudentClass, include: [{model: Class, include: [Course]}] }
    ]

  });
};
