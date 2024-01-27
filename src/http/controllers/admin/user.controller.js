const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models/index");
const { validationResult } = require("express-validator");
const Excel = require('exceljs');
const bcrypt = require("bcrypt");
const generator = require("generate-password");

const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const sendMail = require("../../../utils/sendMail");
const addUserService = require("../../services/admin/users/addUser.service");
const updateUserService = require("../../services/admin/users/updateUser.service");
const destroyUserService = require("../../services/admin/users/destroyUser.service");
const getUserService = require("../../services/admin/users/getUser.service");
const filterUserService = require("../../services/admin/users/filterUser.service");
const exportExcel = require("../../../utils/exportExcel");

const User = model.User;
let data = null
module.exports = {
  index: async (req, res) => {
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
    data = users
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
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const password = generator.generate({
        length: 10,
        numbers: true,
      });

      const hash = bcrypt.hashSync(password, 10);
      const subject = "Mật khẩu người dùng";
      const html = `<p>Mật khẩu của bạn là ${password}. Vui lòng đăng nhập để đổi mật khẩu</p>`;

      const info = sendMail(email, subject, html);

      if (info) {
        addUserService({
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
      }
    } else {
      req.flash("error", errors.array());
    }

    res.redirect("/admin/manager/users/add");
  },
  editUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
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
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      updateUserService({ name, email, phone, address }, id);

      req.flash("success", "Sửa thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/users/edit/" + id);
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    destroyUserService(id);

    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/users");
  },
  deleteAll: async(req, res) => {
    const {id} = req.body
    const data = id.split(",")
    data.forEach((id) => {
      destroyUserService(id)
    });
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/users");
  },
  importExcel: async(req, res) => {
  
    const workbook = new Excel.Workbook();
    const files = req.files['myFiles']

    files.forEach(file => {
      workbook.xlsx.readFile('./public/uploads/' + file.filename )
      .then(function() {
        ws = workbook.getWorksheet(1)
        ws.eachRow({ includeEmpty: false }, async function(row, rowNumber) {
          if(rowNumber !== 1){
            const [empty, email, name, phone, address] = row.values;
            const data = { email: email.text, name, phone, address };
    
            try {
              const password = generator.generate({
                length: 10,
                numbers: true,
              });
        
              const hash = bcrypt.hashSync(password, 10);
              const subject = "Mật khẩu người dùng";
              const html = `<p>Mật khẩu của bạn là ${password}. Vui lòng đăng nhập để đổi mật khẩu</p>`;
        
              const info = sendMail(data.email, subject, html);
              data.password = hash
              data.typeId = 1
              if(info){
                addUserService(data)
                req.flash("success", "Thành công")
              }
              
           
            } catch (error) { 
              req.flash("error", "Thất bại")
            }
          }
        
        });
        
      });
    });
    res.redirect("/admin/manager/users")
  },
  exportExcel: async(req, res) => {
    const columns = ["Email", "Tên", "Số điện thoại", "Địa chỉ"]
    const values = ["email", "name", "phone", "address"]
    exportExcel(data, columns, values, res)
  
  }
}

