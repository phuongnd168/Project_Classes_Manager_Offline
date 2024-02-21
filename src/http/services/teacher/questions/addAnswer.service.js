
const model = require("../../../../models/index");

const Answer = model.answers;
module.exports = async (questionId, teacherId, content) => {
    await Answer.create({questionId, teacherId, content})
};