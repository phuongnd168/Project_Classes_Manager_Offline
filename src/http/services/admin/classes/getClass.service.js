const model = require("../../../../models/index");
const Class = model.Class;

module.exports = async () => {
  return await Class.findAll({ include: model.User });
};
