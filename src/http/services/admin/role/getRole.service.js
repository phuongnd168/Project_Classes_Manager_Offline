const model = require("../../../../models/index");
const Role = model.Role;

module.exports = async () => {
  return await Role.findAll();
};