const model = require("../../../../models/index");
const User = model.User;
module.exports = async (data, userId) => {
  await User.update(data, { where: { id: userId } });
};
