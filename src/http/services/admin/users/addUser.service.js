const model = require("../../../../models/index");
const User = model.User;
module.exports = async (data, idTeacher) => {
  const newClass = await Class.create(data);
  newClass.addUser(await User.findOne({ where: { id: idTeacher } }));
};
