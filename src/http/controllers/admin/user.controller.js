const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models/index");
const { Op } = require("sequelize");
const emailValidate = require("../../../utils/emailValidate");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const nodemailer = require("nodemailer");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { keyword } = req.query;
    const { PER_PAGE } = process.env;
    let filters = {
      [Op.and]: [
        { typeId: 1 },
        {
          id: {
            [Op.ne]: req.user.id,
          },
        },
      ],
    };
    if (keyword) {
      filters[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

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

    const users = await User.findAll({
      where: filters,
      limit: +PER_PAGE,
      offset: offset,
    });

    res.render("admin/users/index", {
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
  addUser: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");

    res.render("admin/users/add", {
      error,
      success,
      req,
      routerRoleRequest,
    });
  },
  handleAddUser: async (req, res) => {
    const { name, email, phone, address } = req.body;
    const isEmail = emailValidate(email);
    const user = await User.findOne({ where: { email } });
    if (user) {
      req.flash("error", "Email đã tồn tại");
      res.redirect("/admin/manager/users/add");
      return;
    }
    if (!name || !email || !phone || !address) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/admin/manager/users/add");
      return;
    }
    if (!isEmail) {
      req.flash("error", "Email sai định dạng");
      res.redirect("/admin/manager/users/add");
      return;
    }
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const hash = bcrypt.hashSync(password, 10);
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `Phương ${process.env.MAIL_USERNAME}`,
      to: email,
      subject: "Mật khẩu người dùng",
      text: `Mật khẩu của bạn là ${password}. Vui lòng đăng nhập để đổi mật khẩu`,
    });
    if (info) {
      await User.create({
        name,
        email,
        phone,
        address,
        typeId: 1,
        password: hash,
      });
      req.flash(
        "success",
        "Thêm thành công, mật khẩu đã được gửi qua email. Vui lòng đăng nhập để đổi mật khẩu"
      );
      res.redirect("/admin/manager/users/add");
      return;
    }
    req.flash("error", "Gửi mail không thành công");
    res.redirect("/auth/forgot-password");
  },
  editUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      req.flash("error", "Không tồn tại");
      res.redirect("/admin/manager/users");
      return;
    }
    if (user.typeId !== 1) {
      req.flash("error", "Không có quyền sửa");
      res.redirect("/admin/manager/users");
      return;
    }
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/users/edit", {
      error,
      success,
      req,
      routerRoleRequest,
      user,
    });
  },
  handleEditUser: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const isEmail = emailValidate(email);
    if (!name || !email || !phone || !address) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/admin/manager/users/edit");
      return;
    }
    if (!isEmail) {
      req.flash("error", "Email sai định dạng");
      res.redirect("/admin/manager/users/edit/" + id);
      return;
    }

    await User.update({ name, email, phone, address }, { where: { id } });
    req.flash("success", "Sửa thành công");
    res.redirect("/admin/manager/users/edit/" + id);
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;

    if (+id === req.user.id) {
      req.flash("error", "Không thể xóa");
      res.redirect("/admin/manager/users");
      return;
    }
    await User.destroy({
      where: {
        id,
      },
    });
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/users");
  },
};
