
const model = require("../../../../models/index");

const Comment = model.Comment;
module.exports = async (parentId, content, userId) => {
    await Comment.create({parentId, userId, content})
};