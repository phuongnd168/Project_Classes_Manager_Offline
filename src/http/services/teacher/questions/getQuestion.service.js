
const model = require("../../../../models/index");
const Question = model.questions;
const User = model.User;
const Answer = model.answers;
module.exports = async (classId) => {
  return await Question.findAll({
    where: {
        classId
    },
    include: [{model: User}, {model: Answer, include: [User]}]
  })
};