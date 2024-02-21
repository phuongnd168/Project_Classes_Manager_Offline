
const model = require("../../../../models/index");
const {Op} = require("sequelize")
const Question = model.questions;
module.exports = async (question, studentId, classId) => {
  await Question.create({
    content: question, studentId, classId
  })
};