const model = require("../../../../models/index");
const User = model.User;
const Class = model.Class;
module.exports = async (filters, limit, offset) => {
  return await User.findAll({
    where: filters,
    limit,
    offset, 
    include: Class

  });
};
