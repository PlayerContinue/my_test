'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('createRows',['$sdLog','$filter', function($sdLog,$filter,$scope){
  	return function(array,text){
  		var rowNum, colNum;
  		var match = String(text).match(/^\s*([0-9]+)\s+by\s+([0-9]*)\s*$/);
  		if(!match){
  			//Doesn't match, throw error
  			throw minErr("Expected n by n, recieved " + text);
  		}

  		rowNum = match[1];
  		colNum = match[2];

  		if(rowNum == 0 && colNum == 0){
  			//No possible length
  			throw minErr("Expected non zero rows or column");
  		}else if(rowNum == 0){
  			rowNum = array.length/colNum;
  		}else if(colNum == 0){
  			colNum == 0;
  		}

  		for(var i=0;i<array.length;i++){

  		}

  		return $filter('limitTo')(array,rowNum);
  	}
  }]).filter('createCols',['$sdLog','$filter',function($sdLog,$filter,$scope){
  	return function(array,text){
  		var rowNum, colNum, index, returnArray;
  		var match = String(text).match(/^\s*([0-9]+)\s*([0-9]+)\s+by\s+([0-9]*)\s*$/);
  		if(!match){
  			//Doesn't match, throw error
  			throw minErr("Expected index n by n, recieved " + text);
  		}
  		//Check for problems
  		if(rowNum == 0 && colNum == 0){
  			//No possible length
  			throw minErr("Expected non zero rows or column");
  		}else if(rowNum == 0){
  			rowNum = array.length/colNum;
  		}else if(colNum == 0){
  			colNum == 0;
  		}

  		for(var i=index;i<colNum;i++){
  			returnArray.push(i);
  		}

  		return returnArray;

  	}
  


  }]);


  function minErr(err){
  	return Error + ": " + err;
  }
