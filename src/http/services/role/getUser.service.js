const model = require("../../../models/index");
const User = model.User;
const Role = model.Role;
const Permission = model.Permission
module.exports = async (userId) => {
  return await User.findOne({
    where: {
        id: userId
    },
    include: {
      model: Role,
      include: {
        model: Permission
      }
    }
  });
};
