module.exports = {
  getDay: (schedule) => {
    let result = "";
    switch (schedule) {
      case 2:
        result = "Thứ hai";
        break;
      case 3:
        result = "Thứ ba";
        break;
      case 4:
        result = "Thứ tư";
        break;
      case 5:
        result = "Thứ năm";
        break;
      case 6:
        result = "Thứ sáu";
        break;
      case 7:
        result = "Thứ bảy";
        break;
      case 8:
        result = "Chủ nhật";
        break;
      default:
        result = "Chưa có lịch học";
        break;
    }
    return result;
  },
};
