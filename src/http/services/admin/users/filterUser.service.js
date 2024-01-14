const { Op } = require("sequelize");
module.exports = async (keyword, req) => {
    let filters = {
        [Op.and]: [
          { typeId: 1 },
          {
            id: {
              [Op.ne]: req.user.id,
            },
          },
        ],
      };
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
  