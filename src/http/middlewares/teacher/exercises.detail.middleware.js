const model = require("../../../models/index")
const {Op} = require("sequelize")

const Exercise = model.Exercise;

module.exports = async (req, res, next) => {
    const {classId, id} = req.params

    const exercise = await Exercise.findOne({
        where: {
            [Op.and]: [{classId}, {id}]
        }
    })
    if(!exercise){
        req.flash("error", "Không tồn tại")
        res.redirect(`/teacher/manager/classes`)
        return
    }
    next()
}; 
  