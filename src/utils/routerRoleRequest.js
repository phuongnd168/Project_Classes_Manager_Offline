
module.exports = (req) => {
   if(req.user.typeId === 1){
    return "/admin"
   }
   else if(req.user.typeId ===2){
    return "/teacher"
   }
   else if(req.user.typeId===3){
    return ""
   }
   else{
    return "/auth/login"
   }
   
}