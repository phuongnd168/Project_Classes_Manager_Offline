
const model = require("../../../../models/index");
const ExercisesSubmit = model.exercises_submit;
const User = model.User;
module.exports = async (exercisesId) => {
  return await ExercisesSubmit.findAll({
    where: {
        exercisesId
    },
    include: User
  })
};