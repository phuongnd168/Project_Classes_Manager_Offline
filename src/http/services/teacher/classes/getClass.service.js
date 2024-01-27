const model = require("../../../../models/index");
const {Op} = require("sequelize")
const Class = model.Class;
const ClassSchedule = model.classes_schedule;
const Course = model.Course;
const User = model.User;
module.exports = async (filters, limit, offset, id) => {
  let data = []
  const user = await User.findOne({
    where: {
      id
    },
    include: Class,
  });
  if(user.Classes?.length){
    data = user.Classes.map(c => {
      return c.id
    });
    return await Class.findAll({
      where: {
        [Op.and]: [filters, {id: {[Op.in]: data }}]
      },
      include: [{ model: ClassSchedule }, {model: Course, include: {model: User}}],
      limit,
      offset,
    })
  }else{
    return data
  }


};
