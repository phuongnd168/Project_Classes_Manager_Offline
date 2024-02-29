const model = require("../models/index")
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const TeacherCalendar = model.teacher_calendar;
module.exports = async (startDate, endDate, day, classId, teacherId, timeLearnStart) => {
    let check = true
    let data = []
    const teacherCalendar = await TeacherCalendar.findAll({
        where: {
            teacherId
        }
    })
    const start = new Date(startDate)
    const end = new Date(endDate)
    await TeacherCalendar.destroy({where: {  classId }})
    async function create(){
    if(start.getTime() > end.getTime()){
        return check
    }
    const hourStart = +timeLearnStart.slice(0, 2) * 60 * 60 * 1000
    const minuteStart = +timeLearnStart.slice(3, 5) * 60 * 1000
    const timeStart = hourStart + minuteStart
    if(start.getDay() === day){
        teacherCalendar.filter(element => {
            const range1 = moment.range(new Date(element.scheduleDate), new Date(element.scheduleDate.getTime() + (3*60*60*1000)));
            const range2 = moment.range(new Date(start.getTime() + timeStart), new Date(start.getTime() + timeStart + (3*60*60*1000)));
            if(range1.overlaps(range2)){
                check = false
                return
            }
        });
        if(!check){
            return
        }
        else{
            data.push({ teacherId, classId, scheduleDate: new Date(start.getTime() + timeStart) })
          
        }
       
    }
 
    start.setDate(start.getDate() + 1)
    await create()
   }


   await create()
   if(check){
    data.forEach(async(element) => {
        await TeacherCalendar.create(element)
    });
   }
   return check
 }