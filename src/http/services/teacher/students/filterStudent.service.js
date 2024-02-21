const { Op } = require("sequelize");
const model = require("../../../../models/index")
const Class = model.Class
const User = model.User
const StudentClass = model.students_class;
module.exports = async (keyword, id) => {


  const classes = await Class.findAll({
    where: {
      teacherId: id
    },
  });

    const data = classes.map((c) => {
      return c.id
    });
  
    const studentsClass = await StudentClass.findAll({
      where: {
        classId: {[Op.in]: data}
      }
    })
    const students = studentsClass.map(student => {
      return student.studentId
    });
  
    const filters = {[Op.and]: [{id: {[Op.in]: students }}]};
    if (keyword) {
      filters[Op.and].push({
        name: {
          [Op.like]: `%${keyword}%`,
        },
      }) 
      
    }
    return filters

};
  