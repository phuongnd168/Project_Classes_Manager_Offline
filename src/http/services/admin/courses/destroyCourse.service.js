const model = require("../../../../models/index");
const Course = model.Course;

module.exports = async (id) => {
  await Course.destroy({
    where: {
      id,
    },
  });
};
