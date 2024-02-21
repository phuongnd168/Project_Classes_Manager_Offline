const model = require("../../../../models/index");
const {Op} = require("sequelize")
const StudentClass = model.students_class;
const StudentAttendance = model.students_attendance;
module.exports = async (student, classId) => {
    if(typeof student === 'string'){
        await StudentClass.destroy({
            where: {
               [Op.and]: [{studentId: student}, {classId}] 
            }
        })
        await StudentAttendance.destroy({
            where: {
               [Op.and]: [{studentId: student}, {classId}] 
            }
        })
    }
    else{
        student.forEach(async(s) => {
            await StudentClass.destroy({
                where: {
                   [Op.and]: [{studentId: s}, {classId}] 
                }
            })
            await StudentAttendance.destroy({
                where: {
                   [Op.and]: [{studentId: s}, {classId}] 
                }
            })
        });
    }

};
