
const model = require("../models/index")
const TeacherCalendar = model.teacher_calendar;
module.exports = async (startDate, endDate, day, classId, teacherId, timeLearnStart) => {

    const start = new Date(startDate)
    const end = new Date(endDate)
    await TeacherCalendar.destroy({where: {  classId }})

    async function create(){
      
    if(start.getTime() > end.getTime()){
        return
    }
    const hour = +timeLearnStart.slice(0, 2) * 60 * 60 * 1000
    const minute = +timeLearnStart.slice(3, 5) * 60 * 1000

    const time = hour + minute
   
    if(start.getDay() === day){
   
        await TeacherCalendar.create({ teacherId: teacherId, classId: classId, scheduleDate: new Date(start.getTime() + time) })
    }
  
    

    start.setDate(start.getDate() + 1)
    create()
   }

   create()

    
 }