const model = require("../models/index")

const Class = model.Class
module.exports = async() => {
    let countClass = []
    const classes = await Class.findAll()
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    months.forEach(month => {
        const data  = classes.filter(element => {
            return element.createdAt.getMonth() === month && element.createdAt.getFullYear() === 2024
        });
        countClass.push(data.length)
    });
    return countClass
    

} 