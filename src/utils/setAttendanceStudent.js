
const model = require("../models/index")
const StudentAttendance = model.students_attendance;
module.exports = async (startDate, endDate, days, classId, studentId, timeLearnStart) => {

    const start = new Date(startDate)
    const end = new Date(endDate)
    
    async function create(){
      
    if(start.getTime() > end.getTime()){
        return
    }
    const hour = +timeLearnStart.slice(0, 2) * 60 * 60 * 1000
    const minute = +timeLearnStart.slice(3, 5) * 60 * 1000

    const time = hour + minute
    days.forEach(async(day) => {
    const data = day.schedule ?? + day
    if(start.getDay() === data){
   
        await StudentAttendance.create({ dateLearning: new Date(start.getTime() + time), studentId, classId, status: 0 })
    }
    });
 
  
    

    start.setDate(start.getDate() + 1)
    create()
   }

   create()

    
 }