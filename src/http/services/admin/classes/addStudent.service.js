const model = require("../../../../models/index");
const setAttendanceStudent = require("../../../../utils/setAttendanceStudent");
const StudentClass = model.students_class;
const ClassSchedule = model.classes_schedule;
const Class = model.Class;

module.exports = async (studentId, classId) => {
    const classInfo = await Class.findOne({
        where: {
            id: classId
        },
        include: ClassSchedule
    })
    
    const {startDate, endDate, classes_schedules, timeLearn} = classInfo
    if(typeof studentId === 'string'){
        const check = await setAttendanceStudent(startDate, endDate, classes_schedules, classId, studentId, timeLearn.slice(0, 5))
        if(!check){
            return 1
        }
        await StudentClass.create({studentId: studentId, classId, statusId: 1})
    }
    else{
        let check = true
        for (const s of studentId) {
            const data = await setAttendanceStudent(startDate, endDate, classes_schedules, classId, s, timeLearn.slice(0, 5))
            if(!data){
                check = false
            }
            else{
                await StudentClass.create({studentId: s, classId, statusId: 1})
            }
            
        };
       
        if(!check){
            return 1
        }
    }

};
