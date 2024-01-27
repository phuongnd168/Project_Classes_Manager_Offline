const model = require("../../../../models/index");
const {Op} = require("sequelize")
const StudentClass = model.students_class;
module.exports = async (id, classId, status, time, reason) => { 
  if(+status === 2){
    await StudentClass.update({statusId: status, recover: time, reason }, { where: {[Op.and]: [{studentId: id}, {classId}]} }); 
  }
  else if(+status === 3){
    await StudentClass.update({statusId: status, dropDate: time, reason }, { where: {[Op.and]: [{studentId: id}, {classId}]} }); 
  }
  else if(+status === 4){
    await StudentClass.update({statusId: status, completed: time, reason }, { where: {[Op.and]: [{studentId: id}, {classId}]} }); 
  }
  else{
    await StudentClass.update({statusId: status}, { where: {[Op.and]: [{studentId: id}, {classId}]} }); 
  }
 
};
