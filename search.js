// PROBLEM: lastRow() and lastColumn() works on cell values (not formatted cells)
// SOLUTION A: add a reasonable amount of cells on to catch over hanging table elements? 
// SOLUTION B: find another method lastFormattedRow() and lastFOrmattedColumn()?
// SOLUTION C: Figure out a method to find absolute intended last row or column - after the lastRow() or lastColumn() returned

// PROBLEM: Comparing values can be misleading false = 0 and true = 1;
// SOLUTION: Validate value as a number value? (but is also used for dates etc so dont break this capability)
// DONE


// PROBLEM: Date values can be compared with [<] or [>] operators, but NOT with [==]!!! Infuriating!!! 
// REASON: [==] operator compares Date Object - not values, however < and > still stands so compareDates() function still works!
// SOLUTION: Will probably have to make another whole new condition function JUST for Dates now!


var Search = {};
// set defaults
Search.dir = "down"
Search.mag = 10;
Search.condition = "equal";

Search.run = function () {
  
  this.xy = [this.startCell.getRow(), this.startCell.getColumn()];
 
  for (var i = 0; i < this.groups; i++) {
    var batch = this.getBatch(this.xy);
    var vals = this.getValues(batch);
    for(var j = 0; j < this.mag; j++){
      if(this.isCondition(vals,j)){
        return this.getCell((i*this.mag)+j);
      }
    }
    this.nextXY();
  }

  if(this.remain > 0){
    var batch = this.getRemain();
    var vals = this.getValues(batch);
    for(var j = 0; j < this.remain; j++){
      if(this.isCondition(vals,j)){
        return this.getCell((this.groups*this.mag)+j);
      }
    }
  }
  
  alert("not found");
  return null;
}

Search.setStartCell = function (startCell) {
  this.startCell = startCell;
  return this;
}

Search.setTarget = function (target) {
  this.target = target;
  return this;
}

Search.setDirection = function (dir) {
  this.dir = dir;
  return this;
}

Search.setMagnitude = function (mag) {
  this.mag = mag
  return this;
}

Search.setCondition = function (condition) {
  this.condition = condition;
  return this;
}

Search.setType = function (type) {
  if(type == "value"){
    this.getValues = function (batch){
      return batch.getValues();
    }
  } else if (type == "background") {
      this.getValues = function (batch){
        return batch.getBackgrounds();
    }
  }
  else if (type == "fontColor") {
      this.getValues = function (batch){
        return batch.getFontColors();
    }  
  } 
  return this;
}

Search.build =  function () {
    
  if(this.dir == "down"){
    
    if(this.condition == "equal"){
      this.isCondition = function (vals,i) {
        if(typeof(vals[i][0])!="boolean"){
          return vals[i][0].valueOf() == this.target.valueOf();
        }
      }   
    } else if (this.condition == "greater") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[i][0])!="boolean"){
          return vals[i][0].valueOf() > this.target.valueOf();
        }
      }
    } else if (this.condition == "less") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[i][0])!="boolean"){
          return vals[i][0].valueOf() < this.target.valueOf();
        }
      }
    } else if (this.condition == "date") {
      this.isCondition = function (vals,i) {
        return isDate(vals[i][0]);
      }
    } else if (this.condition == "boolean") {
      this.isCondition = function (vals,i) {
        return typeof(vals[i][0]) == "boolean";
      }
    }
    
    this.startIndex = this.startCell.getRow();
    this.lastIndex = sheet.getLastRow();
    this.range = this.lastIndex - this.startIndex + 1;
    
    // new 
    this.getBatch = function (xy) {
      return sheet.getRange(xy[0],xy[1],this.mag,1);
    }
    this.nextXY = function () {
      this.xy[0] = this.xy[0]+this.mag;
    }
    this.getCell = function (i) {
      return this.startCell.offset(i,0);
    }
    this.getRemain = function () {
      return this.startCell.offset(this.groups*this.mag,0,this.remain,1);  
    }
    
  } else if (this.dir == "left") {
    
    if(this.condition == "equal"){
      this.isCondition = function (vals,i) {
        if(typeof(vals[0][vals[0].length-1-i])!="boolean"){
          return vals[0][vals[0].length-1-i].valueOf() == this.target.valueOf();
        }
      }   
    } else if (this.condition == "greater") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[0][vals[0].length-1-i])!="boolean"){
          return vals[0][vals[0].length-1-i].valueOf() > this.target.valueOf();
        }
      }
    } else if (this.condition == "less") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[0][vals[0].length-1-i])!="boolean"){
          return vals[0][vals[0].length-1-i].valueOf() < this.target.valueOf();
        }
      }
    } else if (this.condition == "date") {
      this.isCondition = function (vals,i) {
        return isDate(vals[0][vals[0].length-1-i]);
      }
    } else if (this.condition == "boolean") {
      this.isCondition = function (vals,i) {
        return typeof(vals[0][vals[0].length-1-i]) == "boolean";
      }
    }
    
    this.startIndex = this.startCell.getColumn();
    this.lastIndex = sheet.getLastColumn();
    this.range = this.startIndex;
    
    // new
    this.getBatch = function (xy) {
      return sheet.getRange(xy[0],xy[1]-this.mag+1,1,this.mag);
    }
    this.nextXY = function () {
      this.xy[1] = this.xy[1]-this.mag;
    }
    this.getCell = function (i) {
      return this.startCell.offset(0,-i);
    }
    this.getRemain = function () {
      var n = -(this.groups*this.mag+this.remain-1);
      return this.startCell.offset(0,-(this.groups*this.mag+this.remain-1),1,this.remain);  
    }
    
  } else if (this.dir == "up") {
    
    if(this.condition == "equal"){
      this.isCondition = function (vals,i) {
        if(typeof(vals[vals.length-1-i][0])!="boolean"){
          return vals[vals.length-1-i][0].valueOf() == this.target.valueOf();
        }
      }   
    } else if (this.condition == "greater") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[vals.length-1-i][0])!="boolean"){
          return vals[vals.length-1-i][0].valueOf() > this.target.valueOf();
        }
      }
    } else if (this.condition == "less") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[vals.length-1-i][0])!="boolean"){
          return vals[vals.length-1-i][0].valueOf() < this.target.valueOf();
        }
      }
    } else if (this.condition == "date") {
      this.isCondition = function (vals,i) {
        return isDate(vals[vals.length-1-i][0]);
      }
    } else if (this.condition == "boolean") {
      this.isCondition = function (vals,i) {
        return typeof(vals[vals.length-1-i][0]) == "boolean";
      }
    }
    
    this.startIndex = this.startCell.getRow();
    this.lastIndex = sheet.getLastRow();
    this.range = this.startIndex ;
    
    // new
    this.getBatch = function (xy) {
      return sheet.getRange(xy[0]-this.mag+1,xy[1],this.mag,1);
    }
    this.nextXY = function () {
      this.xy[0] = this.xy[0]-this.mag;
    }
    this.getCell = function (i) {
      return this.startCell.offset(-i,0);
    }
    this.getRemain = function () {
      return this.startCell.offset(-(this.groups*this.mag+this.remain-1),0,this.remain,1);  
    }
    
  } else if (this.dir == "right") {
    
    if(this.condition == "equal"){
      this.isCondition = function (vals,i) {
        if(typeof(vals[0][i])!="boolean"){
          return vals[0][i].valueOf() == this.target.valueOf();
        }
      }   
    } else if (this.condition == "greater") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[0][i])!="boolean"){
          return vals[0][i].valueOf() > this.target.valueOf();
        }
      }
    } else if (this.condition == "less") {
      this.isCondition = function (vals,i) {
        if(typeof(vals[0][i])!="boolean"){
          return vals[0][i].valueOf() < this.target.valueOf();
        }
      }
    } else if (this.condition == "date") {
      this.isCondition = function (vals,i) {
        return isDate(vals[0][i]);
      }
    } else if (this.condition == "boolean") {
      this.isCondition = function (vals,i) {
        return typeof(vals[0][i]) == "boolean";
      }
    }
    
    this.startIndex = this.startCell.getColumn();
    this.lastIndex = sheet.getLastColumn();
    this.range = this.lastIndex - this.startIndex + 1;
    
    // new
    this.getBatch = function (xy) {
      return sheet.getRange(xy[0],xy[1],1,this.mag);
    }
    this.nextXY = function () {
      this.xy[1] = this.xy[1]+this.mag;
    }
    this.getCell = function (i) {
      return this.startCell.offset(0,i);
    }
    this.getRemain = function () {
      return this.startCell.offset(0,(this.groups*this.mag),1,this.remain);  
    }
  }
  
  this.groups = Math.floor(this.range/this.mag);
  this.remain = this.range - (this.mag*this.groups);

  return this;
}


