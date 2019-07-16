function isCheck (cell) {
  
  if(typeof(cell.getValue()) === "boolean"){
    
    if(cell.getWidth() == 1) {
      
      return true
      
    }
  }
}

function toggleGroup(check) {
  
  if(check.getColumn() == 2){
    
    if(check.getWidth() == 1) {
      
      var groupRow = check.offset(1,0).getRow();
      
      var groupDepth = sheet.getRowGroupDepth(groupRow);
      
      var group = sheet.getRowGroup(groupRow,groupDepth);
      
      if(check.getValue() == true){
        
        group.expand();
        
      } else {
        
        group.collapse();
        
      }
    }
  }
}

// method for creating check boxes (before google added native support for this) // deprecated?

function getCheckboxValidation () {
  
  return spreadsheetApp.DataValidation().requireCheckbox().build();
  
}
