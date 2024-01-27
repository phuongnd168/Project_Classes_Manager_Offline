const { check } = require("express-validator");
const model = require("../../../models/index");
const { Op } = require("sequelize");
const User = model.User;
module.exports = () => {
  return [
    check("time").custom(async (value, { req }) => {
      const {status, reason, time} = req.body
      if(+status !==1){
        if(!time){
            throw new Error("Vui lòng chọn thời gian");
        }
      
        if(+status !== 4 && !reason){
            throw new Error("Vui lòng nhập lý do");
        }
      }
   
    }),
  ];
};
