function alert(s){
  
  app.flush();
  
  ui.alert(s);
  
}

function log(s){
  
  Logger.log(s);

}

function objectToString(o) {
  
  var keyVals = Object.entries(o);
  
  var string = "";
  
  for(var i = 0 ; i < keyVals.length; i++){
    
    string = string + keyVals[i][0] + ": " + keyVals[i][1] + "\n"
    
  }
  
  return string;
  
}

// only 1D array supported

function arrayToString(a){
  
  var string = "[";
  
  for(var i = 0 ; i < a.length; i++){
    
    string = string + a[i] + ", ";
    
  }
  
  string = string + " ]";
  
  return string;
  
}

function flash(range) {
  
  var bg = range.getBackgrounds();
  
  range.setBackground(red);
  
  app.flush();
  
  Utilities.sleep(300);
  
  range.setBackgrounds(bg);
  
}

// POLYFILL Object.entries

if (!Object.entries) {
  
  Object.entries = function( obj ){
    
    var ownProps = Object.keys( obj ),
        
        i = ownProps.length,
        
        resArray = new Array(i); // preallocate the Array
    
    while (i--)
      
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    
    return resArray;
    
  }
}
