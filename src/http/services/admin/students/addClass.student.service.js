const model = require("../../../../models/index");
const User = model.User;
const StudentClass = model.students_class;
module.exports = async (classes, studentId) => {
    if(typeof classes === 'string'){
        await StudentClass.create({studentId, classId: classes, statusId: 1})
    }
    else{
        classes.forEach(async(c) => {
            await StudentClass.create({studentId, classId: c, statusId: 1})
        });
    }

};
