const model = require("../../../models/index");
const getClassService = require("../../services/student/classes/getClass.service");
const Exercise = model.Exercise
const {Op} = require("sequelize")
module.exports = async (req, res, next) => {
    const {classId, id} = req.params
    const exercise = await Exercise.findOne({
        where: {
            [Op.and]: [{classId}, {id}]
        }
    })

    if(!exercise){
        req.flash("error", "Không tồn tại")
        res.redirect("/classes")
        return
    }
    next()
}; 
  