function alert(s){
    app.flush();
    ui.alert(s);
}

function props() {
  alert("vector:\n mag: " + vector.mag + "\n dir: " + vector.dir);
}
