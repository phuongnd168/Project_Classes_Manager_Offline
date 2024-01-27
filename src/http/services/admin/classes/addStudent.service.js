const model = require("../../../../models/index");
const StudentClass = model.students_class;
module.exports = async (student, classId) => {
    if(typeof student === 'string'){
        await StudentClass.create({studentId: student, classId, statusId: 1})
    }
    else{
        student.forEach(async(s) => {
            await StudentClass.create({studentId: s, classId, statusId: 1})
        });
    }

};
