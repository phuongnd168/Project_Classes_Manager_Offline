const model = require("../../../../models/index");
const CourseModule = model.course_module;
const ModuleDocument = model.module_document;
module.exports = async (courseId) => {
    return await CourseModule.findAll({
      where: {
          courseId
      },
      include: ModuleDocument
    });
  };
  