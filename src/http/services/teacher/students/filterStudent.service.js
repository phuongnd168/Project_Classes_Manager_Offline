const { Op } = require("sequelize");
const model = require("../../../../models/index")
const Class = model.Class
const User = model.User
const StudentClass = model.students_class;
module.exports = async (keyword, id) => {


  const user = await User.findOne({
    where: {
      id
    },
    include: Class,
  });

    const classes = user.Classes.map(async(c) => {
      return c.id
    });
  
    const data = await StudentClass.findAll({
      where: {
        classId: {[Op.in]: await Promise.all(classes)}
      }
    })
    const students = data.map(student => {
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
  