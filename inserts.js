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
  var contents = cell.offset(1,0,height-1,width);
  
  sheet.insertRows(cell.getRow(),height);
  container.clear().setDataValidation(null).setVerticalAlignment("top");
  contents.shiftRowGroupDepth(1);
  //sheet.hideRow(footer);
  
  var area = sheet.getRange(row,1,height,100);
  area.clear().clearDataValidations();
  
  return {cell:cell,
          header:header,
          footer: footer, 
          container:container,
          contents:contents
         };
}

function getTableWidth () {
  
  var startCell = sheet.getRange(1,1);
  Search.dir = "right";
  Search.setStartCell(startCell).setTarget("left border").setType("value");
  Search.build();
  var left = Search.run();
  Search.setStartCell(left).setTarget("right border");
  Search.build();
  var right = Search.run();
  return right.getColumn() - left.getColumn() + 1;
}

function getRange (top, bottom){
  var width = bottom.getColumn() - top.getColumn() + 1;
  var height = bottom.getRow() - top.getRow() + 1;
  return sheet.getRange(top.getRow(),top.getColumn(), height, width);
}
