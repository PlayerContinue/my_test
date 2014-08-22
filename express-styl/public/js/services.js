'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .factory('$sdLog',['$log','DEBUG',function($log,DEBUG){
  	return {
  		log: function(toLog){
  			if(DEBUG && angular.isString(toLog)){
  				$log.log(toLog);
  			}
  		}
  	};
  }])
  .factory('templateCall',['$resource','serverLocation', function($resource,serverLocation){
    return {
      api: $resource(serverLocation + '/:name', {name:'@name'})

    };
  }])

  //****************************
  //@description: Return whether the index is between the two values
  //@param
  //parentIndex:
  //index: The value of the object to be checked
  //numberPerRow: How many should be in the row
  .factory('inRow',['$sdLog',function($sdLog){
    return function(parentIndex, index, numberPerRow){
      var greaterThan,lessThan;
      index = index +1;
      if(parentIndex == 0 && index < numberPerRow){
        return true;
      }
       greaterThan = parentIndex*numberPerRow;
       lessThan = parentIndex*numberPerRow + numberPerRow;
      $sdLog.log('parent ' + parentIndex + ' index ' + index + " greaterThan " + greaterThan + " lessThan " + lessThan);
      return parentIndex!=0 && (greaterThan < index && index < lessThan);
    }
  }]);