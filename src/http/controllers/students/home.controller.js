const checkConnectSocial = require("../../../utils/checkConnectSocial");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const getTimetableService = require("../../services/student/timetable/getTimetable.service");
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("students/home/index", {
      layout: "layouts/student.layout.ejs",
      req, routerRoleRequest, error, success 
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
    res.render("students/account/index", {
      layout: "layouts/student.layout.ejs",
      userConnect,
      error,
      success,
      req,
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
  
    res.redirect("/account");
  },
  changePassword: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("students/account/change-password", {
      layout: "layouts/student.layout.ejs",
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
    res.redirect("/account/change-password");
    return;
  },
  resetPassword: (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("students/account/reset-password", {
      layout: false,
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
    const password = bcrypt.hashSync(newPassword, 10);
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
    res.redirect("/account/reset-password");
    return;
  },
  timetable: async(req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const {id} = req.user
    const timetable = await getTimetableService(id)
    res.render("students/home/timetable", {
      layout: "layouts/student.layout.ejs",
      req, routerRoleRequest, error, success, timetable
    });
  }
};
