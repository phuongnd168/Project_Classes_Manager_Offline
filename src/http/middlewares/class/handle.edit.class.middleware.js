const { check } = require("express-validator");


module.exports = () => {
  return [
 
    check("name", "Tên lớp học bắt buộc phải nhập").notEmpty(),
    check("quantity", "Sĩ số bắt buộc phải nhập").notEmpty(),
    check("startDate", "Ngày khai giảng bắt buộc phải chọn").notEmpty(),
    check("endDate", "Ngày bế giảng bắt buộc phải chọn").notEmpty(),
    check("schedule", "Lịch học bắt buộc phải chọn").notEmpty(),
    check(
      "timeLearnStart",
      "Thời gian bắt đầu học bắt buộc phải chọn"
    ).notEmpty(),
    check(
      "timeLearnEnd",
      "Thời gian kết thúc học bắt buộc phải chọn"
    ).notEmpty(),
  ];
};
