module.exports = (typeId) => {
    if(typeId === 1){
        return "(Admin)"
    }else if(typeId === 2){
        return "(Giảng viên)"
    }else if(typeId === 3){ 
        return "(Học viên)"
    } 
}