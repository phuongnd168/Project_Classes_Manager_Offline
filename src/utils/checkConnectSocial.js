const model = require("../models/index");
const UserSocial = model.user_social;
const { Op } = require("sequelize");
module.exports = async (provider, req) => {
  const userSocial = await UserSocial.findOne({
    where: {
      [Op.and]: [{ userId: req.user.id }, { provider }],
    },
  });
  return userSocial ? true : false;
};
