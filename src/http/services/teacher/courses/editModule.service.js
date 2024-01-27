const model = require("../../../../models/index");
const ModuleDocument = model.module_document;
module.exports = async (link, idModule) => {
    await ModuleDocument.update({ pathName: link }, {
        where: {
          id: idModule
        }
    });
  
};
