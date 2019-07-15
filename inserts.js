// warning - sheet will be event source sheet as default (needs generalising)

function insertRows (cell, width, height, below) {
  
  var row = cell.getRow();
  
  var cell = cell.offset(0,0,1,1);
  
  var fontFamily = cell.getFontFamily(); 
  
  var rowHeight = sheet.getRowHeight(row);
  
  var row = cell.getRow();
  var header = cell.offset(0,0,1,width);
  var footer = header.offset(height-1,0);
  var container = cell.offset(0,0,height,width);
  var leftCol = cell.offset(0,0,height,1);
  var rightCol = cell.offset(0,width-1,height,1); 
  var rows = getRangeOfRows(header.getRow(),footer.getRow());
  
  sheet.insertRows(cell.getRow(),height);
  container.clear().setDataValidation(null).setVerticalAlignment("top");
  
  rows.clear().clearDataValidations();
  
  // universal style
  sheet.setRowHeights(row,height,rowHeight);
  rows.setFontFamily(fontFamily);
  rows.setHorizontalAlignment(textStyle.horizontalAlignment);
  rows.setVerticalAlignment(textStyle.verticalAlignment);
  
  return {cell:cell,
          header:header,
          footer: footer, 
          container:container,
          leftCol: leftCol,
          rightCol: rightCol,
          rows:rows
         };
}

function insertData (cell, input) {
  
  for(var i = 0; i < input.length; i++){
    
    cell.setValue(input[i]);
    
    cell = cell.offset(0,1);
    
  } 
}
