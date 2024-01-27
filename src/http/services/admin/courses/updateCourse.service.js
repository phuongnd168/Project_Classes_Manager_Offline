const model = require("../../../../models/index");
const Course = model.Course;
const Class = model.Class;
const User = model.User;
module.exports = async (data, courseId) => {
  await Course.update(data, { where: { id: courseId } });
  const course = await Course.findOne({
    where: {
      id: courseId
    }
  })
  const teacher = await User.findOne({
    where:{
      id: course.teacherId
    }
  })
  const classInfo = await Class.findAll({
    where:{
      courseId
    }
  })
  classInfo.forEach(element => {
    element.setUsers(teacher)
  });
};
