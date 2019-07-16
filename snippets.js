function getSnippet (snippetName) {
  
  var start, snipSheet, snip, tag;

  start = {}; snip = {}; snip.start = {}; snip.end = {}; tag = {};
  
  // currently uses sheet named "snippets" - needs generalising
  
  snipSheet = spreadsheet.getSheetByName("snippets");
  
  start.cell = snipSheet.getRange(1,2);

  Search.setTarget(snippetName).setCondition("equal").setType("value").setStartCell(start.cell).setDirection("down").build();
  
  tag.cell = Search.run();
  
  snip.start.cell = tag.cell.offset(2,0);

  Search.setStartCell(snip.start.cell).build();
  
  tag.cell = Search.run();
  
  snip.end.cell = tag.cell.offset(-2,0);
  
  snip.range = getRangeOfRows(snip.start.cell.getRow(),snip.end.cell.getRow(),"snippets");

  return snip.range;
  
}

function addSnippet (snippetName, cell){
  
  var snippet = getSnippet(snippetName);

  var height = getRangeHeight(snippet);

  var row = cell.getRow();
  
  var to = sheet.getRange(row,1);
  
  var insertblock = insertRows(cell,getTableWidth(),height);
  
  insertblock.container.setBackground(lightGrey3);
 
  snippet.copyTo(to);
  
  insertblock.height = height;
  
  return insertblock;
  
}
