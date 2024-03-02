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
      const {quantity, startDate, timeLearnStart} = req.body
      const hourStart = +timeLearnStart.slice(0, 2) * 60 * 60 * 1000
      const minuteStart = +timeLearnStart.slice(3, 5) * 60 * 1000
      const timeStart = hourStart + minuteStart
      const time = new Date(timeStart).getUTCHours()
      const start = new Date(startDate).getUTCFullYear()

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
      if(time < 7 || time > 19){
        throw new Error("Thời gian bắt đầu học chỉ trong khoảng 7h sáng tới 7h tối");
      }
      if(start < new Date().getUTCFullYear() || start > 2030){
        throw new Error("Năm học không nhỏ hơn  hoặc quá xa hiện tại");
      }
    }),
  ];
};
