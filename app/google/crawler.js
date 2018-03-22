var restClient = require('node-rest-client').Client;
var _ = require('lodash');
var config = require('../../config/config')

var entity = require('../models/entity');
//console.log (config);
var placedetailapi = config.placeapi+'key='+config.apikey+'&placeid=';
var entityList = [];
var client = new restClient();

function getGooglePlaceData(apiEndpoint , apiKey, searchCriteria, callback)
{
	console.log(searchCriteria);
	var endppoint = apiEndpoint+'query='+searchCriteria+'&key='+apiKey;
	
	client.get(endppoint, function (data) {
	    var total = data.results.length;
        recursion();
	    function recursion(){
	        if(total===0){
                callback(entityList);
            } else {
                const value = data.results.shift();
                const entity = {};
                entity.place_id = value.place_id;
                entity.address = value.formatted_address;
                entity.name = value.name;
                getPlaceDetails(value.place_id, function(details){
                    entity.phone = details.phone;
                    entity.website = details.website;
                    entity.email = details.email;
                    entity.rating = details.rating;
                    //entity.opening_hours = result.opening_hours;
                    //entity.geometry = result.geometry;
                    entity.tags = details.tags;
                    entity.mapurl = details.mapurl;
                   // console.log('Entity : --> '  + JSON.stringify(entity));
                    //entityList.push(entity);
                    entityList.push(entity);
                    //console.log(entityList.length);
                    total--;
                    recursion();
                });
            }
        }

		/*_.forEach(data.results, function(value) {
			var entity = {};
			entity.place_id = value.place_id;
			entity.address = value.formatted_address
			entity.name = value.name;
			getPlaceDetails(value.place_id, function(details){
				entity.phone = details.phone;
				entity.website = details.website;
				entity.email = details.email;
				entity.rating = details.rating;
				//entity.opening_hours = result.opening_hours;
				//entity.geometry = result.geometry;
				entity.tags = details.tags;
				entity.mapurl = details.mapurl;
				console.log('Entity : --> '  + JSON.stringify(entity));
				//entityList.push(entity);
				entityList.push(entity);
				//console.log(entityList.length);
			});
			//console.log(entity);
			callback(entityList);

			//console.log(entity);
	    });*/


		//console.log('=====>' + entityList.length);
		//console.log(JSON.stringify(entityList));
		
	});
	
}

function getPlaceDetails(placeId, callback)
{
	var client = new restClient();
	
	client.get(placedetailapi+placeId, function (placedetails) {
		//console.log(placedetails);
		var details = {};
		var result  = placedetails.result
		
		//console.log(result.formatted_phone_number + ':'+result.international_phone_number);
		var phones = [];
		phones.push(_.isUndefined(result.formatted_phone_number)?"":result.formatted_phone_number);
		phones.push(_.isUndefined(result.international_phone_number)?"":result.international_phone_number);
		details.phone = phones;
		details.website =  _.isUndefined(result.website)?"":result.website;
		details.email = _.isUndefined(result.email)?"":result.email; 
		details.rating = _.isUndefined(result.rating)?"":result.rating;
		//entity.opening_hours = result.opening_hours;
		//entity.geometry = result.geometry;
		details.tags = result.types
		details.mapurl = result.url;
		//console.log(entity);
		callback(details);
		//return entity;
	});
}

//
//var search = 'Bowling in 85248'; //Photographer
//
//getGooglePlaceData(config.api, config.apikey, search,function(data){
//	_.forEach(data, function(value) {
//		//console.log(value);
//	});
//	//console.log(data.length);
//});

module.exports.getGooglePlaceData = getGooglePlaceData;
