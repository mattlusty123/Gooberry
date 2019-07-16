var weekDays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

var weekDaysShort = ["sun","mon","tue","wed","thu","fri","sat"];

var WeekDaysShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function isDate (d) {
  
    return Object.prototype.toString.call(d)=="[object Date]";
  
}

function getToday () {
  
  return new Date((new Date()).toDateString());
  
}

function getNormDate (date) {
  
  if(isDate(date)){
    
     return new Date(date.toDateString());
    
  } else {
    
    return null;
    
  }
}

function compareDates (date1, date2) {
  
  if(isDate(date1) && isDate(date1)){
    
    if(date1 < date2){
      
      return "less";
      
    } else if (date1 > date2) {
      
      return "greater";
      
    } else {
      
      return "equal";
      
    }
    
  } else {
    
    return null; 
    
  }
}

// Date object needs transferring to project manually via Date = a.Date

Date.prototype.addDays = function(days) {
  
    var date = new Date(this.valueOf());
  
    date.setDate(date.getDate() + days);
  
    return date;
  
}
