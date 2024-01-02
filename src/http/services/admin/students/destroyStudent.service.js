const model = require("../../../../models/index");
const User = model.User;

module.exports = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};
