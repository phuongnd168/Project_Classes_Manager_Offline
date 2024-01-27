const excel = require("excel4node");
module.exports = (data, columns, values, res) => {
    const workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet("Sheet 1");
 
    var style = workbook.createStyle({
      font: {
        color: "#000101",
        size: 12,
      },
    });

    data.forEach((e, index) => {
        const count = columns.length
        if(!index){
        
            for(let i = 0; i<count; i++){
                worksheet.cell(1, i+1).string(columns[i]).style(style);
            }
           
        }

     
        for(let i = 0; i<count; i++){

 
            if(typeof e.dataValues[values[i]] === 'string'){
              
                worksheet
                .cell(index + 2, i+1)
                .string(e.dataValues[values[i]])
                .style(style);
            }
            else if(typeof e.dataValues[values[i]] === 'number'){
                worksheet
                .cell(index + 2, i+1)
                .number(e.dataValues[values[i]])
                .style(style);
            }
        }
    });
    
    workbook.write("Excel.xlsx", res);
    return;
}