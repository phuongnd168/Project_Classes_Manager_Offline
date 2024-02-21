const model = require("../../../models/index");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const Excel = require('exceljs');
const getCourseService = require("../../services/admin/courses/getCourse.service");
const addCourseService = require("../../services/admin/courses/addCourse.service");
const destroyCourseService = require("../../services/admin/courses/destroyCourse.service");
const updateCourseService = require("../../services/admin/courses/updateCourse.service");
const filterCourseService = require("../../services/admin/courses/filterCourse.service");
const exportExcel = require("../../../utils/exportExcel");
const getDocument = require("../../../utils/getDocument");
const getUserService = require("../../services/role/getUser.service");
let data = null
const Course = model.Course;
const User = model.User;
const CourseModule = model.course_module;
const ModuleDocument = model.module_document;

module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { keyword } = req.query;
    const { PER_PAGE } = process.env;
    
    const filters = await filterCourseService(keyword)
    const totalCountObj = await Course.findAndCountAll({
      where: filters,
    });

    const totalCount = totalCountObj.count;

    const totalPage = Math.ceil(totalCount / PER_PAGE);

    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }

    const offset = (page - 1) * PER_PAGE;
    const courses = await getCourseService(filters, +PER_PAGE, offset);
    data = courses
    const user = await getUserService(req.user.id)
    
    res.render("admin/courses/index", {
      user,
      req,
      getPaginateUrl,
      page,
      totalPage,
      routerRoleRequest,
      courses,
      success,
      error,
      offset,
    });
  },
  addCourse: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const user = await getUserService(req.user.id)
    res.render("admin/courses/add", {
      user,
      error,
      success,
      req,
      routerRoleRequest,
    });
  },
  handleAddCourse: async (req, res) => {
    const errors = validationResult(req);
    const { name, price, duration, numberOfSessions } = req.body;
    if (errors.isEmpty()) {
      addCourseService({
        name,
        price,
        tryLearn: numberOfSessions ? numberOfSessions : 0,
        duration,
      });

      req.flash("success", "Thêm thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/courses/add");
  },
  editCourse: async (req, res) => {
    const { id } = req.params;
    const course = await Course.findOne({ where: { id }});
    const success = req.flash("success");
    const error = req.flash("error");
    const user = await getUserService(req.user.id)
    res.render("admin/courses/edit", {
      user,
      error,
      success,
      req,
      routerRoleRequest,
      course,
 
    });
  },
  handleEditCourse: async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const { name, price, tryLearn, numberOfSessions, duration } = req.body;
    
    if (errors.isEmpty()) {
      updateCourseService(
        { name, price, tryLearn: +tryLearn ? numberOfSessions : 0, duration },
        id
      );

      req.flash("success", "Sửa thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/courses/edit/" + id);
  },

  deleteCourse: async (req, res) => {
    const { id } = req.params;
    destroyCourseService(id);

    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/courses");
  },
  module: async(req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    let documents = {}
    const documentId = []
    const {id} = req.params
    const modules = await CourseModule.findAll({where: {
        courseId: id
      },
        include: ModuleDocument
    })
    modules.forEach(element => {
      if(element.module_documents.length){
          
          element.module_documents.forEach(e => {
              const data = getDocument(e.pathName)
              const idDocument = e.id
              documents[idDocument] = data
              documentId.push(idDocument)
          });
      }
      
    
    });
    const user = await getUserService(req.user.id)
    res.render("admin/courses/module", {
      user,
      modules,
      documents,
      documentId,
      error,
      success,
      req,
      routerRoleRequest,
    })
  },
  deleteAll: async(req, res) => {
    const {id} = req.body
    const data = id.split(",")
    data.forEach((id) => {
      destroyCourseService(id)
    });
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/courses");
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
            const [empty, name, price, teacherId, tryLearn, quantity, duration] = row.values;
            const data = { name, price, teacherId, tryLearn, quantity, duration };
    
            try {
                addCourseService(data)
                req.flash("success", "Thành công")          
          
            } catch (error) { 
              req.flash("error", "Thất bại")
            }
          }
        
        });
        
      });
    });
    res.redirect("/admin/manager/courses")
  },
  exportExcel: async(req, res) => {
    const columns = 
    ["Tên khóa học", "Giá(VNĐ)", "Học thử(buổi)", "Thời lượng khóa học(buổi)"]
    const values = ["name", "price", "try_learn", "duration"]
    data.forEach(course => {

       let tryLearn = 0 
       course.dataValues.try_learn =  course.tryLearn ? tryLearn + course.tryLearn : 0 
    });
    
    exportExcel(data, columns, values, res)
  
  },
};
