const { check } = require("express-validator");

module.exports = () => {
  return [
    check("name", "Tên khóa học bắt buộc phải nhập").notEmpty(),
    check("price", "Giá khóa học bắt buộc phải nhập").notEmpty(),
    check("duration", "Thời lượng học bắt buộc phải nhập").notEmpty(),
    check("numberOfSessions").custom(async (value, { req }) => {
      const {tryLearn, duration, quantity} = req.body
      if(+tryLearn && !value){
        throw new Error("Số buổi học thử bắt buộc phải nhập");
      }
      if(value > 3){
        throw new Error("Số buổi học thử không quá 3 buổi");
      }
      if(+duration > 60){
        throw new Error("Số buổi học không quá 60 buổi");
      }

    }),
  ];
};
