const getRoleService = require("../../services/admin/role/getRole.service");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const getPermissionService = require("../../services/admin/role/getPermission.service");
const { validationResult } = require("express-validator");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const addRoleService = require("../../services/admin/role/addRole.service");
const getRoleDetailService = require("../../services/admin/role/getRoleDetail.service");
const updateRoleService = require("../../services/admin/role/updateRole.service");
const model = require("../../../models/index");
const getUserService = require("../../services/admin/users/getUser.service");
const getUserInfoService = require("../../services/role/getUser.service");
const filterUserService = require("../../services/admin/users/filterUser.service");
const updateUserRoleService = require("../../services/admin/role/updateUserRole.service");
const Role = model.Role
const User = model.User
module.exports = {
    index: async(req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const roles = await getRoleService()
        const user = await getUserInfoService(req.user.id)
        
        res.render("admin/role/index", {
            user,
            req,
            routerRoleRequest,
            success,
            error,
            roles
        });
    },
    addRole: async(req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const permissions = await getPermissionService()
        const user = await getUserInfoService(req.user.id)
        res.render("admin/role/add", {
            user,
            req,
            routerRoleRequest,
            success,
            error,
            permissions
        });
    },
    handleAddRole: async(req, res) => {
        const errors = validationResult(req);
        const { role, permission } = req.body;
        
        if (errors.isEmpty()) {
          await addRoleService(role, permission);
    
          req.flash("success", "Thêm thành công");
        } else {
          req.flash("error", errors.array());
        }
        res.redirect("/admin/manager/role/add");
    },
    editRole: async(req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id} = req.params
        const role = await getRoleDetailService(id)
        const permissions = await getPermissionService()
        const user = await getUserInfoService(req.user.id)
        res.render("admin/role/edit", {
            user,
            role,
            req,
            routerRoleRequest,
            success,
            error,
            permissions
        });
    },
    handleEditRole: async(req, res) => {
        const errors = validationResult(req);
        const { role, permission } = req.body;
        const {id} = req.params
        if (errors.isEmpty()) {
          await updateRoleService(role, permission, id);
    
          req.flash("success", "Sửa thành công");
        } else {
          req.flash("error", errors.array());
        }
        res.redirect("/admin/manager/role/edit/"+id);
    },
    authorization: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const user = await getUserInfoService(req.user.id)
        res.render("admin/role/authorization", {
            user,
            req,
            routerRoleRequest,
            success,
            error,
        });
    },
    users: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const { keyword } = req.query;
        const { PER_PAGE } = process.env;
        const filters = await filterUserService(keyword, req)
    
        const totalCountObj = await User.findAndCountAll({
          where: filters,
        });
    
        const totalCount = totalCountObj.count;
    
        const totalPage = Math.ceil(totalCount / PER_PAGE);
    
        let { page } = req.query;
        if (!page || page < 1 || page > totalPage) {
          page = 1;
        }
    
        const offset = (page - 1) * PER_PAGE;
        const users = await getUserService(filters, +PER_PAGE, offset);
        const user = await getUserInfoService(req.user.id)
        res.render("admin/role/users", {
          user,
          req,
          routerRoleRequest,
          users,
          getPaginateUrl,
          success,
          error,
          totalPage,
          page,
          offset,
        });
      },
    addUserRole: async(req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id} = req.params
        const roles = await getRoleService()
        const userInfo = await User.findOne({
            where:{
                id
            },
            include: Role
        })
        const user = await getUserInfoService(req.user.id)
        res.render("admin/role/add-user-role", {
            roles,
            req,
            routerRoleRequest,
            success,
            error,
            user,
            userInfo
        });
    },
    handleAddUserRole: async(req, res) => {
        const errors = validationResult(req);
        const { role } = req.body;
        const {id} = req.params
        if (errors.isEmpty()) {
          await updateUserRoleService(role, id);
    
          req.flash("success", "Phân quyền thành công");
        } else {
          req.flash("error", errors.array());
        }
        res.redirect("/admin/manager/role/authorization/users/"+id);
    },
 

}