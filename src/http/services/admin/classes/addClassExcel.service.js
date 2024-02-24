const model = require("../../../../models/index");
const addClassService = require("../../../services/admin/classes/addClass.service");
const numberValidate = require("../../../../utils/numberValidate");
const validateDate = require("../../../../utils/validateDate");
const validateTime = require("../../../../utils/validateTime");
const {Op} = require("sequelize")
const Class = model.Class;
const User = model.User;
const Course = model.Course;
module.exports = async (data) => {
  const { name, quantity, startDate, schedule, timeLearn, teacher, course} = data
  const classInfo = await Class.findOne({
    where: {
      name
    }
  })
  const teacherInfo = await User.findOne({
    where: {
      [Op.and]: [{name: teacher}, {typeId: 2}]
    }
  })
  const courseInfo = await Course.findOne({
    where: {
      name: course
    }
  })
  let error = ""
  if(!name){
    error = "Tên lớp học không được để trống"
  }
  else if(classInfo){
    error =  "Tên lớp học đã tồn tại"
  }
  else if (!quantity) {
    error =  "Sĩ số lớp học không được để trống"
  }
  else if (!numberValidate(quantity)) {
    error =  "Sĩ số lớp học không đúng định dạng"
  }
  else if (quantity > 16) {
    error =  "Số học viên không được quá 16 người"
  }
  else if(!startDate){
    error =  "Ngày khai giảng không được để trống"
  }
  else if (!validateDate(startDate)) {
    error =  "Ngày khai giảng không đúng định dạng"
  }
  else if(!schedule && schedule!==0){
    error =  "Lịch học không được để trống"
  }
  else if(!numberValidate(schedule)){
    error =  "Lịch học không đúng định dạng"
  }
  else if(!timeLearn){
    error =  "Thời gian học không được để trống"
  }
  else if(!validateTime(timeLearn.slice(0, 5))){
    error =  "Thời gian bắt đầu không đúng định dạng"
  }
  else if(!validateTime(timeLearn.slice(6, 11))){
    error =  "Thời gian kết thúc không đúng định dạng"
  }
  else if(!teacher){
    error =  "Tên giáo viên không được để trống"
  }
  else if(!teacherInfo){
    error =  "Tên giáo viên không tồn tại"
  }
  else if(!course){
    error =  "Tên khóa học không được để trống"
  }
  else if(!courseInfo){
    error =  "Tên khóa học không tồn tại"
  }else{
    addClassService({name, quantity, startDate, timeLearn, courseId: courseInfo.id, teacherId: teacherInfo.id}, teacherInfo.id, schedule.toString(), startDate, timeLearn.slice(0,5))
    return error
  }
  return error

};
