// setBorder(top, left, bottom, right, vertical, horizontal, color, style)
/*
setBorder(top, left, bottom, right, vertical, horizontal, color, style)
SpreadsheetApp.BorderStyle.DASHED
DOTTED
DASHED
SOLID
SOLID_MEDIUM
SOLID_THICK
DOUBLE
*/

Border = {};
Border.color = black;
Border.size = "thick";
Border.line = "outside";


Border.apply = function (range) {
  
  var size;
  var color;
 
  
  if (this.size == "thin") {
    var size = SpreadsheetApp.BorderStyle.SOLID;
  } else if (this.size == "thick"){
    var size = SpreadsheetApp.BorderStyle.SOLID_MEDIUM;
  } else if (this.size == "xthick"){
    var size = SpreadsheetApp.BorderStyle.SOLID_THICK;
  }
  
  color = this.color;
  
  if (this.line == "horizontal"){
    range.setBorder(null, null, null, null, null, true, color, size);
  } else if (this.line == "vertical") {
    range.setBorder(null, null, null, null, true, null, color, size);
  } else if (this.line == "outside") {
    range.setBorder(true, true, true, true, null, null, color, size);
  } else if (this.line == "top") {
    range.setBorder(true, null, null, null, null, null, color, size);
  } else if (this.line == "right") {
    range.setBorder(null, null, null, true, null, null, color, size);
  } else if (this.line == "bottom") {
    range.setBorder(null, null, true, null, null, null, color, size);
  } else if (this.line == "left") {
    range.setBorder(true, null, null, null, null, null, color, size);
  } else if (this.line == "grid"){
    range.setBorder(true, true, true, true, true, true, color, size);
  } else if (this.line == "innerGrid"){
    range.setBorder(null, null, null, null, true, true, color, size);
  } else if (this.line == "notTop"){
    range.setBorder(null, true, true, true, null, null, color, size);
  } else if (this.line == "noBottom"){
    range.setBorder(true, true, true, null, null, null, color, size);
  }
  
}

// resizing
// sheet.setRowHeight(rowPosition, height);
// setRowHeights(startRow, numRows, height);

var colors = {
  dividers: "#b7b7b7",
  darkGrey1: "#b7b7b7",
  darkDivider: "#999999",
  darkGrey2: "#999999",
  xdarkDivider: "#",
  darkGrey3: "#",
  xxdarkDivider: "#",
  darkGrey4: "#",
  lightDividers: "#cccccc",
  grey: "#cccccc",
  outside: "#ffffff",
  black: "#ffffff"
}

function resizeRow (height) {
  sheet.setRowHeight(range.getRow(), height);
}
