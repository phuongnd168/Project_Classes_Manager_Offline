const {Op} = require("sequelize")
const model = require("../../../../models/index");
const getEndDate = require("../../../../utils/getEndDate");
const setCalendar = require("../../../../utils/setCalendar");
const setAttendanceStudent = require("../../../../utils/setAttendanceStudent");
const Class = model.Class;
const User = model.User;
const ClassSchedule = model.classes_schedule;
const Course = model.Course;
const StudentAttendance = model.students_attendance;
const StudentClass = model.students_class;
module.exports = async (data, classId, teacherId, schedule, startDate, timeLearnStart) => {
  
  const classInfo = await Class.findOne({
    where: {
      id: classId
    },
    include: ClassSchedule
  })
  const classSchedule = classInfo.classes_schedules.map(element => {
    return element.schedule.toString()
  });

  const students = await StudentClass.findAll({where: {[Op.and]: [{classId}, {statusId: 1}]}})
  const course = await Course.findOne({
    where: {
      id: data.courseId
    }
  })

  const teacher = await User.findOne({
    where: {
      id: teacherId
    }
  })
  const endDate = await getEndDate(startDate, course.id, schedule)
 
  data.endDate =  endDate.setDate(endDate.getDate() - 1)
  
  await Class.update(data, { where: { id: classId } });

  if (typeof schedule === "string") {
    const check = await setCalendar(startDate, endDate, +schedule, classId, teacherId, timeLearnStart)
    if(!check){
      return 1
    }
    await ClassSchedule.destroy({where:{classId}})
    await ClassSchedule.create({ classId, schedule: +schedule });
    let classes_schedules = []
    classes_schedules.push(schedule)
    
    if(classInfo.startDate !== startDate 
      || classSchedule.toString() !== classes_schedules.toString() 
      || classInfo.timeLearn.localeCompare(data.timeLearn)!==0 
      || classInfo.courseId !==data.courseId)
      {
      await StudentAttendance.destroy({where: { classId }})
      students.forEach(student => {
        setAttendanceStudent(startDate, endDate, classes_schedules, classId, student.studentId, timeLearnStart)
      });
      
    }
  } else {
    let check 
    schedule.forEach(async (element) => {
      const data = await setCalendar(startDate, endDate, +element, classId, teacherId, timeLearnStart)
      if(!data){
        check = false
      }
      else{
        await ClassSchedule.destroy({where:{classId}})
        await ClassSchedule.create({ classId, schedule: +element });
      }
      
      
    });
    if(!check){
      return 1
    }
    if(classInfo.startDate !== startDate  
      || classSchedule.toString() !== schedule.toString() 
      || classInfo.timeLearn.localeCompare(data.timeLearn)!==0 
      || classInfo.courseId !==data.courseId)
      {
      await StudentAttendance.destroy({where: { classId }})
      students.forEach(student => {
        setAttendanceStudent(startDate, endDate, schedule, classId, student.studentId, timeLearnStart)
      });
      
    }
  }
  classInfo.setUsers(teacher);
};
