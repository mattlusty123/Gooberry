// setBorder(top, left, bottom, right, vertical, horizontal, color, style)
/*
SpreadsheetApp.BorderStyle.DASHED
DOTTED
DASHED
SOLID
SOLID_MEDIUM
SOLID_THICK
DOUBLE
*/

function border (range, border) {
  if (border == "outer"){
    range.setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM)
  } else if (border == "horizontal") {
    
  } else {
    a.alert("border failed");
  }
}
