const model = require("../../../models/index");
const getClassService = require("../../services/student/classes/getClass.service");


module.exports = async (req, res, next) => {
    const {classId} = req.params
    const classes = await getClassService(req.user.id)
    const data = classes.map(element => {
        return element.classId
    });
    if(!data.includes(+classId)){
        req.flash("error", "Không tồn tại")
        res.redirect("/classes")
        return
    }
    next()
}; 
  