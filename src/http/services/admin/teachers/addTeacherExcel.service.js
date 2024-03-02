const model = require("../../../../models/index");
const emailValidate = require("../../../../utils/emailValidate");
const phoneValidate = require("../../../../utils/phoneValidate");
const User = model.User;

module.exports = async (data) => {
  const {email, name, phone, address, typeId} = data
  let error = ""
  const user = await User.findOne({ where: { email } });
  if(!email){
    error = "Email không được để trống"
  }
  else if(!emailValidate(email)){
    error =  "Email không đúng định dạng"
  }
  else if (user) {
    error =  "Email đã tồn tại"
  }
  else if(!name){
    error =  "Tên không được để trống"
  }
  else if(!phone){
    error =  "Số điện thoại không được để trống"
  }
  else if(!phoneValidate(phone.toString())){
    error =  "Số điện thoại không đúng định dạng"
  }
  else if(!address){
    error =  "Địa chỉ không được để trống"
  }
  else if(typeId!==2 && typeId !==4){
    error =  "Vai trò chỉ được phép là giảng viên(2) hoặc trợ giảng(4)"
  }else{
    await User.create(data)
    return error
  }
  return error

};