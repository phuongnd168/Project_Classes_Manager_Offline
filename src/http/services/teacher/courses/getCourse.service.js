const model = require("../../../../models/index");
const Course = model.Course;
const Class = model.Class
module.exports = async (filters, limit, offset, teacherId) => {
  return await Course.findAll({
    where: filters,
    limit,
    offset,
    include: {
      model: Class,
      where: {
        teacherId
      }
    }
  });
};
