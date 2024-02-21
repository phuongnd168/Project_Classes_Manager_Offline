
const model = require("../../../../models/index");
const {Op} = require("sequelize")
const Comment = model.Comment;
const User = model.User;
module.exports = async (classId, exercisesId) => {
  return await Comment.findAll({
    where: {
        [Op.and]: [{classId}, {exercisesId}]
    },
    include: User
  })
};