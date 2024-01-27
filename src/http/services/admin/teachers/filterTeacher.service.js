const { Op } = require("sequelize");
module.exports = async (keyword) => {
  let filters = {
    [Op.and] : [{  [Op.or]: [
      { typeId: 2 } ,{ typeId: 4 },
    ],}]
  
  };
  if (keyword) {

    filters[Op.and].push({[Op.or]: [
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
    ]});
  }
      return filters
};
  