const model = require("../../../../models/index");

const ExercisesSubmit = model.exercises_submit;
const Comment = model.Comment
module.exports = async (exercisesId, studentId, content, classId) => {
    await ExercisesSubmit.create({
        exercisesId, studentId, content
    })
    await Comment.create({
        classId, content, userId: studentId
    })
};