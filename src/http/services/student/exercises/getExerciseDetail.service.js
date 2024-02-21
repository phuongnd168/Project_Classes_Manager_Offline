const model = require("../../../../models/index");
const Exercise = model.Exercise;

module.exports = async (exerciseId) => {
  return await Exercise.findByPk(exerciseId)
};