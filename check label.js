function getID (cell){
  var row = cell.getRow();
  var col = cell.getColumn();
  var colID = sheet.getRange(1, col).getValue(); 
  var IDs = sheet.getRange(row, 1).getValue().split(" ");
  return IDs[colID];
}

function getTable (left,right) {

  var table = {};
  
  var startCell = sheet.getRange(1,1);
  
  var left = Search.setTarget(left).setType("value").setCondition("equal").setStartCell(startCell).setDirection("right").build().run();
  
  if(left){
 
    var right = Search.setTarget(right).setStartCell(left).build().run();
    
    if(right){
      
      table.width = right.getColumn() - left.getColumn() + 1;
      
    } else {return}

  } else {return}
  
  var colIdVals = sheet.getRange(1,1,1,right.getColumn()).getValues();
  
  var colIdVal;
  
  table.colIds = {};
  
  for (var i = 0; i < colIdVals[0].length; i++) {
    
    colIdVal = colIdVals[0][i];
    
    if(colIdVal){
      
      table.colIds[colIdVal] = i+1;
      
    }
  }
  
  var rowIdVals = sheet.getRange(1,1,10,1).getValues();
  var rowIdVal;
  table.rowIds = {};

  for (var i = 0; i < rowIdVals.length; i++) {

    rowIdVal = rowIdVals[i][0];

    if(rowIdVal){
      
      if(!table.rowIds[rowIdVal]){
        
        table.rowIds[rowIdVal] = i+1;
        
      } else {
        
        break;
        
      }
      
    }
  }
  
  return table;
}
