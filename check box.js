function isCheck (cell) {
  if(typeof(cell.getValue()) === "boolean"){
    if(cell.getWidth() == 1) {
      return true
    }
  }
}

function getCheckboxValidation () {
  return spreadsheetApp.DataValidation().requireCheckbox().build();
}

function toggleGroup(cell) {
  // validation requirement (needs generalising)
  if(cell.getColumn() == 2){
    // ensure it is single cell range (prevents common bug wrongly identifying checkboxes)
    if(cell.getWidth() == 1) {
      var groupRow = cell.offset(1,0).getRow();
      var groupDepth = sheet.getRowGroupDepth(groupRow);
      var group = sheet.getRowGroup(groupRow,groupDepth);
      if(cell.getValue() == true){
        group.expand();
      } else {
        group.collapse();
      }
    }
  }
}

