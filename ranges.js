function getRange (startCell, endCell){
  var width = endCell.getColumn() - startCell.getColumn() + 1;
  var height = endCell.getRow() - startCell.getRow() + 1;
  return sheet.getRange(startCell.getRow(),startCell.getColumn(), height, width);
}

function getRangeOfRows(startIndex, endIndex, fromSheet){

  if(fromSheet){
    var fromSheet = spreadsheet.getSheetByName(fromSheet);
  } else {
    var fromSheet = sheet;
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
  var startCell = sheet.getRange(1,1);
  Search.dir = "right";
  Search.setStartCell(startCell).setTarget("left").setType("value");
  Search.build();
  var left = Search.run();
  Search.setStartCell(left).setTarget("right");
  Search.build();
  var right = Search.run();
  return right.getColumn() - left.getColumn() + 1;
}

function resizeRow (height) {
  sheet.setRowHeight(range.getRow(), height);
}

/////////////////////////////////////
// added directional parseVals
/////////////////////////////////////
// transforms undirectional 2D range values to 1D directional array

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
