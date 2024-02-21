const model = require("../../../../models/index");
const Role = model.Role;
const Permission = model.Permission;
module.exports = async (role, permissions) => {
  const newRole = await Role.create({name: role});
  if(typeof permissions === 'string'){
    newRole.addPermission(await Permission.findByPk(permissions))
  }else{
    permissions.forEach(async(permission) => {
      newRole.addPermission(await Permission.findByPk(permission))
    });
  }
};
