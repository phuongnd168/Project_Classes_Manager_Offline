const { check } = require("express-validator");
const model = require("../../../models/index");
const Class = model.Class;
const StudentClass = model.students_class;
module.exports = () => {
  return [
    check("student").custom(async (value, { req }) => {
        let count 
        const {id} = req.params
        const classInfo = await Class.findByPk(+id)
        const {count: countStudent} = await StudentClass.findAndCountAll({
          where: {
            classId: id
          }
        })
        if(typeof value === 'string'){
            count = 1
        }else{
            count = value.length
        }
    
        if(countStudent + value.length >classInfo.quantity){
            throw new Error("Số học viên đã vượt quá giới hạn");
        }
    }),
  ];
};
