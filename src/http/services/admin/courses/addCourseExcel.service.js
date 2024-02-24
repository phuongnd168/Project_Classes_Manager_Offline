const model = require("../../../../models/index");

const numberValidate = require("../../../../utils/numberValidate");

const Course = model.Course;

module.exports = async (data) => {
  const { name, price, tryLearn, duration } = data

  let error = ""
  if(!name){
    error = "Tên khóa học không được để trống"
  }
  else if(!price){
    error =  "Giá khóa học không được để trống"
  }
  else if (!numberValidate(price)) {
    error =  "Giá khóa học không đúng định dạng"
  }
  else if(!tryLearn){
    error =  "Số buổi học thử không được để trống"
  }
  else if (!numberValidate(tryLearn)) {
    error =  "Số buổi học thử không đúng định dạng"
  }
  else if(tryLearn > 3){
    error =  "Số buổi học thử không quá 3 buổi"
  }
  else if(!duration){
    error =  "Thời lượng học không được để trống"
  }
  else if(duration > 60){
    error =  "Thời lượng học không quá 60 buổi"
  }
  else if (!numberValidate(duration)) {
    error =  "Thời lượng học không đúng định dạng"
  }else{
    await Course.create(data)
    return error
  }
  return error

};
