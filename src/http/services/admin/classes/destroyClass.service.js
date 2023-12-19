const model = require("../../../../models/index");
const Class = model.Class;

module.exports = async (id) => {
  await Class.destroy({
    where: {
      id,
    },
  });
};
