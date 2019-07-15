function copyRangeAndGroups (source, to) {
  source.range.copyTo(to);
  applyGroups(source.groupDepths,to);
}

// working on better group handling // SEE Exercises
function getGroupDepths (range) {
  var sheet = range.getSheet();
  var h = getRangeHeight(range);
  var groupDepths = [];
  var row = range.getRow();
  for(var i = 0 ; i < h ; i++){
    groupDepths[i] = sheet.getRowGroupDepth(row+i);
  };
  return groupDepths; 
}

function applyGroups (groupDepths,to) {
  to = to.offset(0,0,1,1);
  for (var i = 0 ; i < groupDepths.length; i++) {
    to.offset(i,0).shiftRowGroupDepth(groupDepths[i]);
  }  

}

function copyFormatFromTo (from, to) {
  var fromRow1 = from.getRow();
  var fromRow2 = from.getLastRow()
  var fromCol1 = from.getColumn();
  var fromCol2 = from.getLastColumn();
  var fromHeight = fromRow2 - fromRow1 + 1;
  var fromWidth = fromCol2 - fromCol1 + 1;
  
  var toRow1 = to.getRow();
  var toCol1 = to.getColumn();
  var toRow2 = toRow1 + fromHeight - 1;
  var toCol2 = toCol1 + fromWidth - 1;
  
  var sheet = to.getSheet();
  from.copyFormatToRange(sheet,toCol1,toCol2,toRow1,toRow2);
  
}
