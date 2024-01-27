const model = require("../models/index")
const Course = model.Course
module.exports = async(startDate, courseId, schedule) => {
    const start = new Date(startDate)
    const course = await Course.findOne({
        where: {
            id: courseId
        }
    })
    const duration = course.duration
    let day = 0 
    async function getEndDate(){
        if(day === duration){
            
            return start
        }
        if(typeof schedule === 'string'){
            if(start.getDay() === +schedule){
                day+=1
            }
        }else{
           schedule.forEach(element => {
            if(start.getDay() === +element){
                day+=1
            }
           }); 
        }
       
      
        start.setDate(start.getDate() + 1)
        getEndDate()
    }
    getEndDate()
    return getEndDate()

}