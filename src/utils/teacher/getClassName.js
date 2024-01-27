module.exports = (students, classes) => {
    const className = {}
    students.map(async (student) => {
        if(student?.students_classes?.length){
            student.students_classes.map(async(s) => {
  
              if(!classes.includes(s.Class.name)){
                return
              }
              if(className.hasOwnProperty(s.studentId.toString())){   
                
                return className[s.studentId] =  [className[s.studentId], " "+ s.Class.name]
              }
        
              return className[s.studentId] =  s.Class.name
          })
        }
      })
    return className
    
}