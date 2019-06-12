function hasChecked (cell) {
  if(typeof(cell.getValue()) === "boolean"){
    if(cell.getWidth() == 1) {
      return true
    }
  }
}


function checkbox (checkboxCell) {
  
  
  //toggleGroup(checkboxCell);
  /*
  var searcher = Search.setStartCell(checkboxCell).setTarget(red).setType("background").setCondition("equal").setDirection("down");
  var target = searcher.build().run();
  if(target){
    target.setValue("paul is awesooome");
  
  }
  */
}

function getButtonFunction (cell) {
  var row = cell.getRow();
  var col = cell.getColumn();
  
  var colId = spreadsheet.getRange(0,col);
  
  var functionIds = spreadsheet.getRange(row,0);
  
  if(colId == 0){
    
  }
  
  
}


