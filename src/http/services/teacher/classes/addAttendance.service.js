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
            const data = await StudentAttendance.findOne({
                where: {
                    [Op.and]: [{studentId: student}, {dateLearning}]
                }
            })
            if(data){
                if(student === +attendance){
                    await StudentAttendance.update({dateLearning, studentId: student, classId, status: 1}, {where: {id: data.id}});
                }else{
                    await StudentAttendance.update({dateLearning, studentId: student, classId, status: 0}, {where: {id: data.id}});
                }
            }else{
                if(student === +attendance){
                    await StudentAttendance.create({dateLearning, studentId: student, classId, status: 1});
                }else{
                    await StudentAttendance.create({dateLearning, studentId: student, classId, status: 0});
                }
            }
           
        });
    }
    else{
        students.forEach(async(student) => {
            const data = await StudentAttendance.findOne({
                where: {
                    [Op.and]: [{studentId: student}, {dateLearning}]
                }
            })
            if(data){
                if(attendance.includes(student.toString())){
                    await StudentAttendance.update({dateLearning, studentId: student, classId, status: 1}, {where: {id: data.id}});
                }else{
                    await StudentAttendance.update({dateLearning, studentId: student, classId, status: 0}, {where: {id: data.id}});
                }
            }else{
                if(attendance.includes(student.toString())){
                    await StudentAttendance.create({dateLearning, studentId: student, classId, status: 1});
                }else{
                    await StudentAttendance.create({dateLearning, studentId: student, classId, status: 0});
                }
            }
            
        });
    }
    
   
 
};
