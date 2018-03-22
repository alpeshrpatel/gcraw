var gapi = require('./crawler.js');
var _ = require('lodash');
var Entity = require('../models/entity');
//console.log(config);
var search = 'Beer Bar in 85248'; //Photographer
var config = require('../../config/config')

var mongoose = require('mongoose');
var env = config.env;
var dbURL = config.mongodb.dbURL;

var entityList = [];

mongoose.connect(dbURL, function (err) {
	console.log('Process Start : ');
	gapi.getGooglePlaceData(config.api, config.apikey, search, function(entityList){
		console.log(entityList);
		console.log('entityList : '  +entityList.length);
		console.log('Process End');
	}, function() {
		console.log('1111Process End');
	});
});


//Entity.insertMany(data)
//    .then(function(data) {
//       console.log("Inserted");
//    })
//    .catch(function(err) {
//    	console.log("Failed");
//    });
//console.log("data length : " + data.length);
//let i = 0;
//data.forEach(function(ele){
//if (i > data.length) console.log("Insert is successfully done.");
//Entity.create(
//		ele, (err, ele) => {
//			if(err)
//			{
//				console.log("Error " + err);	
//			}
//			i++;
//		});
//	});
//});
//let i =0 ;
//_.forEach(data, (ele)=>{
////console.log(data.length);
//Entity.create(
//	ele, (err, ele) => {
//		if(err)
//		{
//			console.log("Error " + err);	
//		}
//		i++;
//		console.log('i :' + i);
//	});
//});