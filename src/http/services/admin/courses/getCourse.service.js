const model = require("../../../../models/index");
const Course = model.Course;
const User = model.User;
module.exports = async (filters, limit, offset) => {
  return await Course.findAll({
    where: filters,
    limit,
    offset,

  });
};
