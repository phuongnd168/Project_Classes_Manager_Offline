const model = require("../../../../models/index");
const User = model.User;

module.exports = async (data) => {
  const user = await User.create(data);


};
