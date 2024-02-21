const model = require("../../../../models/index");
const StudentAttendance = model.students_attendance;
const Class = model.Class;
module.exports = async (studentId) => {
  return await StudentAttendance.findAll({where: {studentId}, include: Class });
};
