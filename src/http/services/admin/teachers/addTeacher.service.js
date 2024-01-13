const model = require("../../../../models/index");
const User = model.User;
module.exports = async (data) => {
  await User.create(data);
};
