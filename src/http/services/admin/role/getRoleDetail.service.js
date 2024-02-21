const model = require("../../../../models/index");
const Role = model.Role;
const Permission = model.Permission;
module.exports = async (roleId) => {
  return await Role.findOne({
    where: {
        id: roleId
    },
    include: Permission
  });
};