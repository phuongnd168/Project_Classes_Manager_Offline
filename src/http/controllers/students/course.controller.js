const routerRoleRequest = require("../../../utils/routerRoleRequest");
const getCourseService = require("../../services/student/courses/getCourse.service");

const getModuleDocumentService = require("../../services/student/courses/getModuleDocument.service");
const getDocument = require("../../../utils/getDocument");

module.exports = {
    index: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id} = req.user
        const courses = await getCourseService(id)
  
        res.render("students/courses/index", {
          layout: "layouts/student.layout.ejs",
          req, 
          routerRoleRequest, 
          error, 
          success,
          courses
        });
    },
    module: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        let documents = {}
        const documentId = []
        const {id} = req.params
        const data = await getModuleDocumentService(id)
        data.forEach(element => {
            if(element.module_documents.length){
                
                element.module_documents.forEach(e => {
                    const data = getDocument(e.pathName)
                    const idDocument = e.id
                    documents[idDocument] = data
                    documentId.push(idDocument)
                });
            }
            
          
        });
    
        res.render("students/courses/module", {
            layout: "layouts/student.layout.ejs",
            documents,
            documentId,
            data,
            req, 
            error,
            success,
            routerRoleRequest, 
        });
    }
}