const model = require("../../../../models/index");
const Course = model.Course;
module.exports = async (data) => {
  await Course.create(data);
};
