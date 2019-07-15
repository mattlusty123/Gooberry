function alert(s){
    app.flush();
    ui.alert(s);
}

function flash(range) {
  var bg = range.getBackgrounds();
  range.setBackground(red);
  app.flush();
  Utilities.sleep(300);
  range.setBackgrounds(bg);
}

function showObject(o) {
  var keyVals = Object.entries(o);
  var string = "";
  for(var i = 0 ; i < keyVals.length; i++){
    string = string + keyVals[i][0] + ": " + keyVals[i][1] + "\n"
  }
  return string;
}

// POLYFILL
// Object.entries(obj)----- UNSUPPORTED (ECMAScript 3 - Javascript 1.6 - Google App Script)

if (!Object.entries) {
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    
    return resArray;
  };
}
