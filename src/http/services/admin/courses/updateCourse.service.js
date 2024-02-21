const model = require("../../../../models/index");
const Course = model.Course;
const Class = model.Class;
const User = model.User;
module.exports = async (data, courseId) => {
  await Course.update(data, { where: { id: courseId } });

};
