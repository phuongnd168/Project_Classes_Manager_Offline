const model = require("../../../../models/index");
const {Op} = require("sequelize")
const StudentClass = model.students_class;
const Class = model.Class;
const Course = model.Course;
module.exports = async (studentId) => {
  return await StudentClass.findAll({
    where: {
        [Op.and]: [{studentId}, {statusId: 1}]
    },
    include: {
        model: Class,
        include: [Course]
    }
  });
};
