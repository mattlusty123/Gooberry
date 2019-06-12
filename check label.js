// will break if checkboxCell is in first row! - okay for my sheets

function checkboxLabel (checkboxCell, direction){
  
  var sideColors = checkboxCell.offset(0,-1,1,3).getBackgrounds();
  var sideValues = checkboxCell.offset(0,-1,1,3).getValues();
  
  if(!direction){

    if(sideColors[0][0] == sideColors [0][1] && sideValues[0][0]!=""){
      return sideValues[0][0];
    } else if (sideColors[0][2] == sideColors[0][1] && sideValues[0][2]!=""){
      return sideValues[0][2];
    }
  } else {
    if(direction == "left"){
      return sideValues[0][0];
    } else if (direction == "right") {
      return sideValues[0][2];
    }
  }
}
