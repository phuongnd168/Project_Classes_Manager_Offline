const { check } = require("express-validator");
const model = require("../../../models/index");
const Class = model.Class;
module.exports = () => {
  return [
    check("name", "Tên lớp học bắt buộc phải nhập").notEmpty(),
    check("quantity", "Sĩ số bắt buộc phải nhập").notEmpty(),
    check("startDate", "Ngày khai giảng bắt buộc phải chọn").notEmpty(),
    check("schedule", "Lịch học bắt buộc phải chọn").notEmpty(),
    check(
      "timeLearnStart",
      "Thời gian bắt đầu học bắt buộc phải chọn"
    ).notEmpty(),
    check("name").custom(async (nameValue, { req }) => {
      const {quantity} = req.body
      const classInfo = await Class.findOne({
        where: {
          name: nameValue,
        },
      });
      if (classInfo) {
        throw new Error("Tên lớp học đã tồn tại");
      }
      if(+quantity > 16){
        throw new Error("Số học viên không được quá 16 người");
      }
    }),
  ];
};
