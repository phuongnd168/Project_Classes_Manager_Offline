const model = require("../../../../models/index");
const Course = model.Course;

module.exports = async (data, idCourse) => {
  await Course.update(data, { where: { id: idCourse } });
};
