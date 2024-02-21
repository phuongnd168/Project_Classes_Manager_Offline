const model = require("../../../../models/index");
const StudentClass = model.students_class;
const Class = model.Class;

module.exports = async (studentId) => {
  return await StudentClass.findAll({
    where: {
        studentId
    },
    include: Class,
    
  });
};
