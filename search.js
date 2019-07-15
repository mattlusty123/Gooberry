var Search = {};

// set defaults // should never rely on these as could have been set already to something different
Search.dir = "down"
Search.mag = 10;
Search.condition = "equal";

/////////////////////////////////////
// FUNCTION RUN
/////////////////////////////////////

Search.run = function () {
 
  this.xy = [this.startCell.getRow(), this.startCell.getColumn()];
  
  for (var i = 0; i < this.groups; i++) {
    
    var batch = this.getBatch(this.xy);
    
    var vals = this.getValues(batch);
   
    // changed
    var vals = this.parseVals(vals);
    
    for(var j = 0; j < this.mag; j++){
      
      // changed
      if(this.isCondition(vals[j])){
        
        return this.getCell((i*this.mag)+j);
        
      }
    }  
    
    this.nextXY();
    
  }

  if(this.remain > 0){
    
    var batch = this.getRemain();
    
    var vals = this.getValues(batch);
    
    // added
    vals = this.parseVals(vals);
   
    for(var j = 0; j < this.remain; j++){
      
      if(this.isCondition(vals[j])){
        
        return this.getCell((this.groups*this.mag)+j);
        
      }
    }
  }

  return null;
  
}

/////////////////////////////////////
// SETTERS
/////////////////////////////////////

Search.setStartCell = function (startCell) {
  this.startCell = startCell;
  this.sheet = startCell.getSheet();
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

// size of range fetched in each cycle
Search.setMagnitude = function (mag) {
  this.mag = mag
  return this;
}

// conditions: equal, less, greater, date, boolean
Search.setCondition = function (condition) {
  this.condition = condition;
  return this;
}

// types: value, font, background, date
Search.setType = function (type) {
  this.type = type;
  return this;
}

/////////////////////////////////////
// added isConditions 
///////////////////////////////////// 

//these should take the "target" as second argument to be completely general for resubility

function isEqual (val) {
  if(typeof(val)!="boolean"){
    return val.valueOf() == this.target.valueOf();
  }
}

function isGreater (val) {
  if(typeof(val)!="boolean"){
    return val.valueOf() > this.target.valueOf();
  }
}

function isLess (val) {
  if(typeof(val)!="boolean"){
    return val.valueOf() < this.target.valueOf();
  }
}

// function isDate already exists

function isDateEqual (val) {
  if(isDate(val)){
    return val.valueOf() == this.target.valueOf();
  }
}

function isDateGreater (val) {
  if(isDate(val)){
    return val.valueOf() > this.target.valueOf();
  }
}

function isDateLess (val) {
  if(isDate(val)){
    return val.valueOf() < this.target.valueOf();
  }
}

function isBoolean (val) {
  if(typeof(val)!="boolean"){
    return typeof(val) == "boolean";
  }
}

/////////////////////////////////////
// BUILD FUNCTION
/////////////////////////////////////

Search.build =  function () {
  
  ///////////////////////////////////

  // INITIALISE DIRECTIONS
  
  ///////////////////////////////////

  if(this.dir == "down"){
   
    this.parseVals = parseDownVals;
    
    this.startIndex = this.startCell.getRow();
    this.lastIndex = Search.sheet.getLastRow();
    this.range = this.lastIndex - this.startIndex + 1;
    
    // new 
    this.getBatch = function (xy) {
      return Search.sheet.getRange(xy[0],xy[1],this.mag,1);
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

    this.parseVals = parseLeftVals;
    
    this.startIndex = this.startCell.getColumn();
    this.lastIndex = Search.sheet.getLastColumn();
    this.range = this.startIndex;
    
    // new
    this.getBatch = function (xy) {
      return Search.sheet.getRange(xy[0],xy[1]-this.mag+1,1,this.mag);
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

    this.parseVals = parseUpVals;
    
    this.startIndex = this.startCell.getRow();
    this.lastIndex = Search.sheet.getLastRow();
    this.range = this.startIndex ;
    
    // new
    this.getBatch = function (xy) {
      return Search.sheet.getRange(xy[0]-this.mag+1,xy[1],this.mag,1);
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
   
    this.parseVals = parseRightVals;
    
    this.startIndex = this.startCell.getColumn();
    this.lastIndex = Search.sheet.getLastColumn();
    this.range = this.lastIndex - this.startIndex + 1;
    
    // new
    this.getBatch = function (xy) {
      return Search.sheet.getRange(xy[0],xy[1],1,this.mag);
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
  
  ///////////////////////////////////
  
  // INITIALISE TYPE
  
  ///////////////////////////////////
  
  if(this.type == "value"){
    this.getValues = function (batch){
      return batch.getValues();
    }
  } else if (this.type == "background") {
    this.getValues = function (batch){
      return batch.getBackgrounds();
    }
  }
  else if (this.type == "fontColor") {
    this.getValues = function (batch){
      return batch.getFontColors();
    }  
  } else if (this.type == "date") {
    this.getValues = function (batch){
      return batch.getValues();
    }
  }
  
  ///////////////////////////////////
  
  // INITIALISE CONDITION
  
  ///////////////////////////////////
  
  if(this.condition == "equal"){

    if(this.type == 'date') {

      this.isCondition = isDateEqual;
      
    } else {
    
    this.isCondition = isEqual;
      
    }
    
  } else if (this.condition == "greater") {
   
    if(this.type == 'date') {
    
      this.isCondition = isDateGreater;
      
    } else {

      this.isCondition = isGreater;
      
    }
    
  } else if (this.condition == "less") {

    if(this.type == 'date') {

      this.isCondition = isDateLess;
      
    } else {

      this.isCondition = isLess;
      
    }
    
  } else if (this.condition == "date") {
 
    this.isCondition = isDate;
    
  } else if (this.condition == "boolean") {

    this.isCondition = isBoolean;
    
  }
  
  this.groups = Math.floor(this.range/this.mag);
  this.remain = this.range - (this.mag*this.groups);
  
  return this;
}

// NOTES

// PROBLEM: lastRow() and lastColumn() works on cell values (not formatted cells) - not suitable for a complete format based search
// SOLUTION A: add a reasonable amount of cells on to catch over hanging table elements? 
// SOLUTION B: find another method lastFormattedRow() and lastFOrmattedColumn()?
// SOLUTION C: Figure out a method to find absolute intended last row or column - after the lastRow() or lastColumn() returned
// IMPLEMENTED: Nothing atm!
