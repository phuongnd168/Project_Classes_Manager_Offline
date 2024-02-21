const model = require("../../../../models/index");
const Permission = model.Permission;
module.exports = async () => {
  return await Permission.findAll();
};