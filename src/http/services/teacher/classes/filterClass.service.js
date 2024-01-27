
const model = require("../../../../models/index");
const {Op} = require("sequelize")
const Class = model.Class;
const User = model.User;
module.exports = async (keyword, id) => {
  
  const user = await User.findOne({
    where: {
      id
    },
    include: Class,
  });

    const data = user.Classes.map(c => {
      return c.id
    });

    const filters = {[Op.and]: [{id: {[Op.in]: data }}]};
    if (keyword) {
      filters[Op.and].push({
        name: {
          [Op.like]: `%${keyword}%`,
        },
      }) 
      
    }
    return filters

};
  