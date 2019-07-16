function getRange (startCell, endCell){
  
  var width = endCell.getColumn() - startCell.getColumn() + 1;
  
  var height = endCell.getRow() - startCell.getRow() + 1;
  
  return sheet.getRange(startCell.getRow(),startCell.getColumn(), height, width);
  
}

function getRangeOfRows(startIndex, endIndex, fromSheet){

  if(fromSheet){
    
    fromSheet = spreadsheet.getSheetByName(fromSheet);
    
  } else {
    
    fromSheet = sheet;
    
  }
  
  return fromSheet.getRange(startIndex+":"+endIndex);
  
}

function getRangeHeight (range) {
  
  var  height = range.getLastRow() - range.getRow() + 1;
  
  return height;
  
}

function getRangeWidth (range) {
  
  var  width = range.getLastColumn() - range.getColumn() + 1;
  
  return width;
  
}

function getTableWidth () {
 
  var left, right, start, width;
  
  left = {};
  
  right = {};
  
  start = {};
  
  start.cell = sheet.getRange(1,1);
  
  Search.setStartCell(start.cell).setTarget("left").setType("value").setCondition("equal").setDirection("right").build();
  
  left.cell = Search.run();

  Search.setStartCell(left.cell).setTarget("right").build();
  
  right.cell = Search.run();
  
  width = right.cell.getColumn() - left.cell.getColumn() + 1;
  
  return width;
  
}

function resizeRow (height) {
  
  sheet.setRowHeight(range.getRow(), height);
  
}

/////////////////////////////////////
// added directional parseVals
/////////////////////////////////////

// transforms undirection 2D range values to 1D directional array

var parseDownVals = function (vals) {
  
  var l = vals.length;
  
  var newVals = [];
  
  vals.forEach(function(item, i, arr){
    
    newVals[i] = vals[i][0];
    
  })
  
  return newVals;
}

var parseLeftVals = function (vals) {
  
  var l = vals[0].length;
  
  var newVals = [];
  
  vals[0].forEach(function(item, i, arr){
    
    newVals[i] = vals[0][l-1-i];
    
  })
  
  return newVals;
  
}

var parseUpVals = function (vals) {
  
  var l = vals.length;
  
  var newVals = [];
  
  vals.forEach(function(item, i, arr){
    
    newVals[i] = vals[l-1-i][0];
    
  })
  
  return newVals;

}

var parseRightVals = function (vals) {
  
  var l = vals[0].length;
  
  var newVals = [];
  
  vals[0].forEach(function(item, i, arr){
    
    newVals[i] = vals[0][i];
    
  })
  
  return newVals;
  
}
