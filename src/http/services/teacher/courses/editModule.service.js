const model = require("../../../../models/index");
const ModuleDocument = model.module_document;
module.exports = async (title, idModule) => {
    await ModuleDocument.update({ title }, {
        where: {
          id: idModule
        }
    });
  
};
