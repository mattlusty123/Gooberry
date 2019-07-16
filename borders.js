// Methods
// @ setBorder(top, left, bottom, right, vertical, horizontal, color, style)

// Parameter
// @ style = SpreadsheetApp.BorderStyle.DASHED / DOTTED / DASHED / SOLID / SOLID_MEDIUM / SOLID_THICK / DOUBLE

// WARNING 
// @ due to the currect workaround to fully format horizontal lines - copyPastFormat 
// @ it the borders on FirstLine and Lastline will be copied from the top of two inserted rows beneath
// @ these inserted rows should carry on side borders etc from row above
// @ (this is a problem when the rows above have been inserted on the end of a bordered area - the side border not continued)
// @ THEREFORE it is advised to do side border etc after applying horizontal borders
// @ (until fixed?)

var Border = {};

Border.color = black;

Border.size = "thick";

Border.line = "outside";

Border.setColor = function (hex) {
  
  this.color = hex;
  
  return this;
  
}

// size - thin, thick, xthick
Border.setSize = function (string) {
  
  this.size = string;
  
  return this;
  
}

Border.setLine = function (string) {
  
  this.line = string;
  
  return this;
  
}

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
  
  // todo - horizontal lines should include the extremes (top and bottoms)

  if (this.line == "horizontal"){
    
    // added code for complete horizontal lines
    
    var firstRow = range.getRow();
    
    var lastRow = range.getLastRow();
    
    var height = lastRow - firstRow + 1;
    
    var width = getRangeWidth(range);
    
    var firstLine = range.offset(0,0,1,width);
    
    var lastLine = range.offset(height-1,0,1,width);
    
    var secondLine = range.offset(1,0,1,width);
    
    var ghostLineOne = range.offset(height,0,1,width);
    
    sheet.insertRowsAfter(lastRow,2);
    
    var extended = range.offset(0,0,height+2,width);
    
    // basic horizontal border code
    
    extended.setBorder(null, null, null, null, null, true, color, size);
    
    ///////////////////////////////

    // WARNING COPY FORMAT COPIES ALL FORMAT (IE BACKGROUND COLORS, NUMBER/DATE ETC)
    
    copyFormatFromTo(ghostLineOne,firstLine);
    
    copyFormatFromTo(ghostLineOne,lastLine);

    // perhaps add code to reset number format / colors??
    
    sheet.deleteRows(lastRow+1,2);
  
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
    
    range.setBorder(null, true, null, null, null, null, color, size);
    
  } else if (this.line == "sides") {
    
    range.setBorder(null, true, null, true, null, null, color, size);
    
  } else if (this.line == "grid"){
    
    range.setBorder(true, true, true, true, true, true, color, size);
    
  } else if (this.line == "innerGrid"){
    
    range.setBorder(null, null, null, null, true, true, color, size);
    
  } else if (this.line == "notTop"){
    
    range.setBorder(null, true, true, true, null, null, color, size);
    
  } else if (this.line == "noBottom"){
    
    range.setBorder(true, true, true, null, null, null, color, size);
    
  }
  
  return this;
  
}

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
