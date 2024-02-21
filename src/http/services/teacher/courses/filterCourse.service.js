const { Op } = require("sequelize");
module.exports = async (keyword) => {
  let filters = {}
    if (keyword) {
      filters = {
        name: {
          [Op.like]: `%${keyword}%`,
        }
      }
    }
  return filters
};
