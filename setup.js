function prepare (width) {
  var right = width + 1;
  sheet.setColumnWidth(1, 1);
  sheet.setColumnWidth(2, 30);
  sheet.setColumnWidth(right, 30);
  
  sheet.setRowHeight(1,1);
  sheet.setRowHeights(2, 1000, 30);
}
