// cell should be validated as boolean (run from boolean section)

function toggleGroup(cell) {
  if(cell.getColumn() == 2){
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
