const model = require("../../../../models/index");
const User = model.User;
module.exports = async (filters, limit, offset) => {
  return await User.findAll({
    where: filters,
    limit,
    offset,
  });
};
