const model = require("../../../../models/index");
const Exercise = model.Exercise;

module.exports = async (classId) => {
  return await Exercise.findAll({
    where: {
        classId
    },
  });
};