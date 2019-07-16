// METHOD: getRowLabel (check)
// @ Uses namedRanges to correct cleared labels
// @ Checks for namedRange duplicates 
// @ Determines label names dynamically

function getRowLabel (check){
  
  var rangeName, namedRange, namedRanges;

  check.rowLabel = sheet.getRange(check.row,1).getValue();
  
  if(check.rowLabel){
    
    // does the label MATCH a namedRange
    
    namedRange = {};
    
    namedRange.range = spreadsheet.getRangeByName(check.rowLabel);
    
    if (namedRange.range) {
     
      // is the label a duplicate of the namedRange?

      namedRange.row = namedRange.range.getRow();
      
      if(check.row == namedRange.row) {
        
        // it is the original NamedRange Label // Success
        
        return check.rowLabel;
        
      } else {
        
        // namedRange duplicate // return
        
        return undefined;
        
      }
      
    } else {
      
      // its definitely not a duplicate of a unique label nameRange // Success
      
      return check.rowLabel;
      
    }
    
  } else {
    
    // unlikely, but make sure there is not a potentially cleared Named Range belongs to this Label
    
    namedRanges = sheet.getNamedRanges();
    
    for (i = 0; i < namedRanges.length; i++){
      
      if(namedRanges[i].getRange().getRow() == check.row){

        // oh snap! This was an unlikely case, but there was supposed to be a label here after all! // Success
        
        check.rowLabel = namedRange[i].getName();
        
        return check.rowLabel;
        
      }
      
    }
    
    // Hmm, this was a very unlikey case. Not sure why I was disturbed. // return
    
    return undefined;
    
  }
 
}

// Simpler method (not too worried about clears and duplicates)

function getColLabel (check){
  
  check.colLabel = sheet.getRange(1, check.col).getValue();
  
  return check.colLabel;
 
}

function getTable () {

  var table, start, left, right, colIdVals, colIdVal, rowIdVals, rowIdVal;
  
  table = {};
  
  start = {};
  
  left = {};
  
  right = {};
  
  start.cell = sheet.getRange(1,1);
  
  ///////////////////////////////////
  // get Col Labels / Ids
  ///////////////////////////////////
  
  left.cell = Search.setTarget("left").setType("value").setCondition("equal").setStartCell(start.cell).setDirection("right").build().run();
  
  if(left.cell){
 
    right.cell = Search.setTarget("right").setStartCell(left.cell).build().run();
    
    if(right.cell){
      
      table.width = right.cell.getColumn() - left.cell.getColumn() + 1;
      
    } else {return}

  } else {return}
  
  colIdVals = sheet.getRange(1,1,1,right.cell.getColumn()).getValues();
  
  colIdVal;
  
  table.colIds = {};
  
  for (var i = 0; i < colIdVals[0].length; i++) {
    
    colIdVal = colIdVals[0][i];
    
    if(colIdVal){
      
      table.colIds[colIdVal] = i+1;
      
    }
  }
  
  ///////////////////////////////////
  // get Row Labels / Ids
  ///////////////////////////////////
  
  rowIdVals = sheet.getRange(1,1,10,1).getValues();
  
  rowIdVal;
  
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
