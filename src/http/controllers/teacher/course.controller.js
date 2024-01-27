const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const model = require("../../../models/index");
const { validationResult } = require("express-validator");
const filterCourseService = require("../../services/teacher/courses/filterCourse.service");
const getCourseService = require("../../services/teacher/courses/getCourse.service");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const exportExcel = require("../../../utils/exportExcel");
const editModuleService = require("../../services/teacher/courses/editModule.service");
let data = null
const Course = model.Course;
const CourseModule = model.course_module;
const ModuleDocument = model.module_document;
module.exports = {
    index: async (req, res) => {
        const {id} = req.user
        const success = req.flash("success");
        const error = req.flash("error");
        const { keyword } = req.query;
        const { PER_PAGE } = process.env;
   
        const filters = await filterCourseService(keyword, id)
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
       
        res.render("teacher/courses/index", {
          layout: "layouts/teacher.layout.ejs",
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
    exportExcel: async(req, res) => {
        const columns = 
        ["Tên khóa học", "Giá(VNĐ)", "Giảng viên", "Học thử(buổi)", "Số lượng học viên(người)", "Thời lượng khóa học(buổi)"]
        const values = ["name", "price", "teacher", "try_learn", "quantity", "duration"]
        data.forEach(course => {
           if(course?.User){
              course.dataValues.teacher = course.User.name
          }else{
              course.dataValues.teacher = "Chưa có giảng viên"
          } 
           let tryLearn = 0 
           course.dataValues.try_learn =  course.tryLearn ? tryLearn + course.tryLearn : 0 
        });
        
        exportExcel(data, columns, values, res)
      
    },
    module: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id} = req.params
        const modules = await CourseModule.findAll({where: {
            courseId: id
          },
            include: ModuleDocument
        })
      
        res.render("teacher/courses/module", {
          layout: "layouts/teacher.layout.ejs",
          id,
          modules,
          error,
          success,
          req,
          routerRoleRequest,
        })
    },
    addModule: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id} = req.params
        res.render("teacher/courses/add-module", {
            layout: "layouts/teacher.layout.ejs",
            id,
            error,
            success,
            req,
            routerRoleRequest,
        })
    },
    handleAddModule: async(req, res) => {
        const {chapter} = req.body
        const {id} = req.params
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            await CourseModule.create({
                name: chapter,
                courseId: id
            })
            req.flash("success", "Thêm thành công")
        }else{
            req.flash("error", errors.array());
        }
        res.redirect(`/teacher/manager/courses/${id}/module/add`);
    },
    addModuleDocument: async(req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id} = req.params
        res.render("teacher/courses/add-module-document", {
            layout: "layouts/teacher.layout.ejs",
            id,
            error,
            success,
            req,
            routerRoleRequest,
        })
    },
    handleAddModuleDocument: async(req, res) => {
        const {link} = req.body
        const {idModule, id} = req.params
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            await ModuleDocument.create({
                pathName: link,
                moduleId: idModule
            })
            req.flash("success", "Thêm thành công")
        }else{
            req.flash("error", errors.array());
        }
        res.redirect(`/teacher/manager/courses/${id}/module/add-module-document/${idModule}`);
    },
    editModuleDocument: async(req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id, idModule} = req.params
        const moduleDocument = await ModuleDocument.findOne({
            where: {
                id: idModule
            }
        })
     
        res.render("teacher/courses/edit-module-document", {
            layout: "layouts/teacher.layout.ejs",
            moduleDocument,
            id,
            error,
            success,
            req,
            routerRoleRequest,
        })
    },
    handleEditModuleDocument: async(req, res) => {
        const {link} = req.body
        const {idModule, id} = req.params
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            editModuleService(link, idModule)
            req.flash("success", "Sửa thành công")
        }else{
            req.flash("error", errors.array());
        }
        res.redirect(`/teacher/manager/courses/${id}/module/edit-module-document/${idModule}`);
    }
}