const model = require("../../../../models/index")
const User = model.User
const Role = model.Role
const Permission = model.Permission
module.exports = async (req, res, next) => {
    const {id} = req.user
   
    const user = await User.findOne({
        where:{
            id
        },
        include: {
            model: Role,
            include: {
                model: Permission
            }
        }
    })
    let check = false
    user.Roles.forEach(role => {
        role.Permissions.forEach(permission => {
           if(permission.value.localeCompare("Xóa người dùng") === 0){
                check = true
                next()
                return
           }
        });
    });
    
    if(!check){
        req.flash("error", "Không có quyền")
        res.redirect("/admin")
        return
    }
};
