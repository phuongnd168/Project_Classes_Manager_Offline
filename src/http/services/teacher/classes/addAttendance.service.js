const model = require("../../../../models/index");

const {Op} = require("sequelize")
const StudentAttendance = model.students_attendance;
const TeacherCalendar = model.teacher_calendar;
const StudentClass = model.students_class;
module.exports = async (classId, dayId, attendance) => {
    const calendar = await TeacherCalendar.findByPk(+dayId)
    const dateLearning = calendar.scheduleDate
  
    let students = await StudentClass.findAll({
        where: {
          [Op.and]: [{classId}, {statusId: 1}]
        },
    })

    students = students.map(student => {
        return student.studentId
    });
  
    if(typeof attendance === 'string'){
        students.forEach(async(student) => {

                if(student === +attendance){
                    await StudentAttendance.update({status: 1}, {where: {[Op.and]: [{studentId: student}, {dateLearning}, {classId}]}});
                }else{
                    await StudentAttendance.update({status: 0}, {where: {[Op.and]: [{studentId: student}, {dateLearning}, {classId}]}});
                }
           
        });
    }
    else{
        students.forEach(async(student) => {
          
         
                if(attendance.includes(student.toString())){
                    await StudentAttendance.update({status: 1}, {where: {[Op.and]: [{studentId: student}, {dateLearning}, {classId}]}});
                }else{
                    await StudentAttendance.update({status: 0}, {where: {[Op.and]: [{studentId: student}, {dateLearning}, {classId}]}});
                }
            
            
        });
    }
    
   
 
};
