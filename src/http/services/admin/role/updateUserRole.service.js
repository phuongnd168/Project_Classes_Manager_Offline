const model = require("../../../../models/index");
const User = model.User;
const Role = model.Role;
module.exports = async (roles, userId) => {

    const user = await User.findByPk(userId)

    if(typeof roles === 'string'){
        user.setRoles(await Role.findByPk(roles))
    }else{
        user.setRoles([])
        roles.forEach(async(role) => {
            user.addRole(await Role.findByPk(role))
        });
    }
};
