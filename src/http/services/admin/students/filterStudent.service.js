const { Op } = require("sequelize");
module.exports = async (keyword) => {
  let filters = { typeId: 3 };
  if (keyword) {
    filters[Op.or] = [
      {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      },
      {
        email: {
          [Op.like]: `%${keyword}%`,
        },
      },
    ];
  }
      return filters
};
  