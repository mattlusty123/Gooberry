// currently uses sheet named "snippets"

function getSnippet(snippet) {
  var snippets = spreadsheet.getSheetByName("snippets");
  var startCell = snippets.getRange(1,2);

  Search.setTarget(snippet).setCondition("equal").setType("value").setStartCell(startCell).build();
  
  var target = Search.run();
  var startSnip = target.offset(2,0);

  var target = Search.setStartCell(startSnip).build().run();
  
  var endSnip = target.offset(-2,0);

  var range = getRangeOfRows(startSnip,endSnip,"snippets");
  
  return range;
}

// better group handling function added // SEE Exercises 

function addSnippet(snippetName,cell){
  // get source
  var snippet = getSnippet(snippetName);
  
  var height = getRangeHeight(snippet);
  var row = cell.getRow();
  var to = sheet.getRange(row,1);
  
  var insertblock = insertRows(cell,getTableWidth(),height);
  insertblock.container.setBackground(lightGrey3);
  
  var groupDepths = getGroupDepths(snippet);
  var rangeAndGroups = {range:snippet,groupDepths:groupDepths};
  
  // copy to space
  copyRangeAndGroups(rangeAndGroups,to);
  
  insertblock.height = height;
  return insertblock;
}

