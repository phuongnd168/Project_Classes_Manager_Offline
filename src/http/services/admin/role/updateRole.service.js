const model = require("../../../../models/index");
const Role = model.Role;
const Permission = model.Permission;
module.exports = async (role, permissions, roleId) => {
    await Role.update({name: role}, {
        where: {
            id: roleId
        }
    });

    const roleUpdate = await Role.findByPk(roleId)

    if(typeof permissions === 'string'){
        roleUpdate.setPermissions(await Permission.findByPk(permissions))
    }else{
        roleUpdate.setPermissions([])
        permissions.forEach(async(permission) => {
            roleUpdate.addPermission(await Permission.findByPk(permission))
        });
    }
};
