const checkConnectSocial = require("../../../utils/checkConnectSocial");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { validationResult } = require("express-validator");
const model = require("../../../models");
const bcrypt = require("bcrypt");
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/dashboard/index", {
      req,
      routerRoleRequest,
      success,
      error,
    });
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
   
    res.render("admin/account/index", {
      req,
      error,
      success,
      routerRoleRequest,
      userConnect,
      user,
    });
  },
  updateInfo: async (req, res) => {
    const errors = validationResult(req);
    const { email, name, phone, address } = req.body;
    const { id } = req.user;
    if (errors.isEmpty()) {
      await User.update(
        {
          email,
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
    res.redirect("/admin/account");
  },
  changePassword: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/account/change-password", {
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
    res.redirect("/admin/account/change-password");
  },
  resetPassword: (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/account/reset-password", {
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
    res.redirect("/admin/account/reset-password");
  },
};
