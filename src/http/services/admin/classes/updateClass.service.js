const model = require("../../../../models/index");
const Class = model.Class;
const User = model.User;
module.exports = async (data, idClass, idTeacher) => {
  const classUpdate = await Class.findOne({ where: { id: idClass } });
  classUpdate.setUsers(await User.findOne({ where: { id: idTeacher } }));
  await Class.update(data, { where: { id: idClass } });
};
