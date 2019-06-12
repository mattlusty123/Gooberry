function flash(range) {
  var bg = range.getBackgrounds();
  range.setBackground(red);
  app.flush();
  Utilities.sleep(1000);
  range.setBackgrounds(bg);
}
