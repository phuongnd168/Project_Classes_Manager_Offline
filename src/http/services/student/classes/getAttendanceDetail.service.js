const model = require("../../../../models/index");
const {Op} = require("sequelize")
const StudentAttendance = model.students_attendance;


module.exports = async (studentId, classId) => {
  return await StudentAttendance.findAll({
    where: {
        [Op.and]: [{studentId}, {classId}]
    },
    
  });
};
