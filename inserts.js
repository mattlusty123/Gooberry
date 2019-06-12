function insertRows (cell, width, height, below) {

  if(below) {
    var i = 0;
    var brake = false; 
    // -----------------------------------------------------
    cell = cell.offset(1,0).activate();
    // find cell below grey bottom row
    while(!(cell.getBackground()==grey)){ 
      cell = cell.offset(1,0).activate();
      i++;
    } // ---------------------------------------------------
    cell = cell.offset(1,0);
  }
  var row = cell.getRow();
  
  var header = cell.offset(0,0,1,width);
  var footer = header.offset(height-1,0);
  var container = cell.offset(0,0,height,width);
  var contents = cell.offset(1,0,5,6);
  
  sheet.insertRows(cell.getRow(),height);
  container.clear().setDataValidation(null).setVerticalAlignment("top");
  contents.shiftRowGroupDepth(1);
  
  var area = sheet.getRange(row,1,height,100);
  area.clear().clearDataValidations();
  
  return {cell:cell,
          header:header,
          footer: footer, 
          container:container,
          contents:contents
         };
}

function getTableDimension () {
  
  var startCell = sheet.getRange(1,1);
  Search.dir = "right";
  Search.setStartCell(startCell).setTarget("left border").setType("value");
  Search.build();
  var left = Search.run();
  Search.setStartCell(left).setTarget("right border");
  Search.build();
  var right = Search.run();
  
  flash(left);
  flash(right);
  
}
