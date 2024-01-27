const checkConnectSocial = require("../../../utils/checkConnectSocial");
const routerRoleRequest = require("../../../utils/routerRoleRequest");

const model = require("../../../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = model.User;
module.exports = {
  index: async (req, res) => {

    const success = req.flash("success");
    const error = req.flash("error");
   
    res.render("teacher/home/index", { layout: "layouts/teacher.layout.ejs", req, routerRoleRequest, success, error });
  },
  account: async (req, res) => {
    const user = req.user;
    const success = req.flash("success");
    const error = req.flash("error");
    
    const userConnect = {};
    const providers = ["google", "facebook", "github"];
    await Promise.all(
      providers.map(async (provider) => {
        return (userConnect[provider] = await checkConnectSocial(
          provider,
          req
        ));
      })
    );

    res.render("teacher/account/index", {
      layout: "layouts/teacher.layout.ejs",
      req,
      userConnect,
      error,
      success,
      routerRoleRequest,
      user,
    });
  },
  updateInfo: async (req, res) => {
    const errors = validationResult(req);
    const { name, phone, address } = req.body;
    const { id } = req.user;
    if (errors.isEmpty()) {
      await User.update(
        {

          name,
          phone,
          address,
        },
        {
          where: {
            id,
          },
        }
      );
      req.flash("success", "Cập nhật thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/teacher/account");
  },
  changePassword: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("teacher/account/change-password", {
      layout: "layouts/teacher.layout.ejs",
      req,
      routerRoleRequest,
      error,
      success,
    });
  },
  handleChangePassword: async (req, res) => {
    const errors = validationResult(req);
    let { id, password } = req.user;

    const { newPassword } = req.body;

    password = bcrypt.hashSync(newPassword, 10);
    if (errors.isEmpty()) {
      await User.update(
        {
          password,
        },
        {
          where: {
            id,
          },
        }
      );
      req.flash("success", "Đổi mật khẩu thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/teacher/account/change-password");
  },
  
  resetPassword: (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("teacher/account/reset-password", {
      layout: "layouts/teacher.layout.ejs",
      req,
      routerRoleRequest,
      error,
      success,
    });
  },
  handleResetPassword: async (req, res) => {
    const errors = validationResult(req);
    const { newPassword } = req.body;
    const { id } = req.user;

    password = bcrypt.hashSync(newPassword, 10);
    if (errors.isEmpty()) {
      await User.update(
        {
          password,
          firstLogin: 1,
        },
        {
          where: {
            id,
          },
        }
      );
      req.session.firstLogin = 1;
      req.flash("success", "Đổi mật khẩu thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/teacher/account/reset-password");
  },
  
};
