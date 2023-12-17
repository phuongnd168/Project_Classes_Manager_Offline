const checkConnectSocial = require("../../../utils/checkConnectSocial");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models");
const bcrypt = require("bcrypt");
const User = model.User;
module.exports = {
  index: async (req, res) => {
    res.render("admin/dashboard/index", { req, routerRoleRequest });
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
    const { name, phone, address } = req.body;
    const { id } = req.user;
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
    let { id, password } = req.user;

    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");

      res.redirect("/admin/account/change-password");
      return;
    }
    const pass = bcrypt.compareSync(oldPassword, password);
    if (!pass) {
      req.flash("error", "Sai mật khẩu cũ");
      res.redirect("/admin/account/change-password");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      req.flash("error", "Mật khẩu nhập lại không trùng khớp");
      res.redirect("/admin/account/change-password");
      return;
    }
    password = bcrypt.hashSync(newPassword, 10);
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
    res.redirect("/admin/account/change-password");
    return;
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
    const { newPassword, confirmNewPassword } = req.body;
    const { id } = req.user;
    if (!newPassword || !confirmNewPassword) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/admin/account/reset-password");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      req.flash("error", "Mật khẩu nhập lại không trùng khớp");
      res.redirect("/admin/account/reset-password");
      return;
    }
    password = bcrypt.hashSync(newPassword, 10);
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
    req.flash("success", "Đổi mật khẩu thành công");
    res.redirect("/admin/account/reset-password");
    return;
  },
};
