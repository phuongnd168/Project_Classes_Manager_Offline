const model = require("../models/index")

const User = model.User

module.exports = async() => {
    let countUser = []
    const users = await User.findAll({
        where: {
          typeId: 3
        }
    })
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    months.forEach(month => {
        const data  = users.filter(user => {
            return user.createdAt.getMonth() === month && user.createdAt.getFullYear() === 2024
        });
        countUser.push(data.length)
    });
    return countUser
    

} 