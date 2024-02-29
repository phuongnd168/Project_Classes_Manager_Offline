
const model = require("../models/index")
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const StudentAttendance = model.students_attendance;
module.exports = async (startDate, endDate, days, classId, studentId, timeLearnStart) => {
    let check = true
    let data = []
    const start = new Date(startDate)
    const end = new Date(endDate)
    const studentAttendance = await StudentAttendance.findAll({
        where: {
            studentId
        }
    })
    async function create(){
      
    if(start.getTime() > end.getTime()){
        return
    }
    const hour = +timeLearnStart.slice(0, 2) * 60 * 60 * 1000
    const minute = +timeLearnStart.slice(3, 5) * 60 * 1000

    const time = hour + minute
    days.map(async(day) => {
    const dateLearn = day.schedule ?? + day
    if(start.getDay() === dateLearn){
        studentAttendance.filter(element => {
            const range1 = moment.range(new Date(element.dateLearning), new Date(element.dateLearning.getTime() + (3*60*60*1000)));
            const range2 = moment.range(new Date(start.getTime() + time), new Date(start.getTime() + time + (3*60*60*1000)));
            if(range1.overlaps(range2)){
                check = false
                return
            }
        });
        if(!check){
            return
        }
        else{
            data.push({ dateLearning: new Date(start.getTime() + time), studentId, classId, status: 0 })
          
        }
    
    }
    });
 
  
    

    start.setDate(start.getDate() + 1)
    await create()
   }

   await create()
   if(check){
    data.forEach(async(element) => {
        await StudentAttendance.create(element)
    });
   }
   return check

    
 }