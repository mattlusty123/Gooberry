var app = SpreadsheetApp;

var spreadsheet = app.getActiveSpreadsheet();

var sheet = app.getActiveSheet();

var ui = app.getUi();

var sheetLastCol = sheet.getLastColumn();

var log = Logger.log;

var range = sheet.getActiveRange();



