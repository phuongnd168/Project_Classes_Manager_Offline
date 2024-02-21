
const {Op} = require("sequelize")
module.exports = async (keyword, id) => {
    let filters = {[Op.and]: [{teacherId: id}]};
    if (keyword) {
      filters[Op.and].push({
        name: {
          [Op.like]: `%${keyword}%`,
        },
      }) 
    }
    return filters

};
  