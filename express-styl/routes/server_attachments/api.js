var async = require('async');
var http = require('http');
var url = require('url');
var parse = require('parse');
var gm = require('googlemaps');
var util = require('util');
var trafficStats = {};
exports = module.exports = trafficStats;

/**
 * [traffic description] Retrieve the users best possible open routes
 * @param  {[type]}   userLocation [description]
 * @param  {[type]}   userHour     [description]
 * @param  {[type]}   userTime     [description]
 * @param  {Function} callback     [description]
 * @return {[type]}                [description]
 */
trafficStats.traffic = function(res, callback) {
    //Search for methods of travel from user location
    return methodsOfTravel(res);
    //Make call to database for 

    //
}

//Get the possible methods of travel
function methodsOfTravel(res) {
    var query = url.parse(res.url, true)
    var options = {
        host: "maps.googleapis.com/maps/api/directions/json"
    };
    var gm = require('googlemaps');
    var util = require('util');
    var s;
    gm.config('key', 'AIzaSyBQoyR-YZVqVujbDaNKZvAK0v09UM4cCLs');
    gm.config('alternatives',true);
    gm.directions(query.userLocation, query.userDestination,
        function(err, data) {
            if (err) {
                console.log('ERROR: ' + err.message);
            } else {
                s = data;
                console.log("" + JSON.stringify(s.routes[1]));

                var lengthOfTrip = [];
                for (var j = 0; j < data.routes.length; j++) {
                    lengthOfTrip[j] = 0;
                    for (var i = 0; i < data.routes[j].legs.length; i++) {
                        console.log(data.routes[j].legs[i].duration.text);
                        lengthOfTrip[j] += data.routes[j].legs[i].duration.text.replace(' mins', '');

                    }
                }
                console.log(lengthOfTrip);
            }
        });

    return s;

}