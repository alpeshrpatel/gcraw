var Entity = require('../models/entity');
var crawler = require('../google/crawler');
var config = require('../../config/config');
var _ = require('lodash');
var mongoose = require('mongoose');
var env = config.env;
var dbURL = config.mongodb.dbURL;

function getEntitys(res) {
    Entity.find(function (err, entities) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(entities); // return all entities in JSON format
    });
};


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all entity
    app.get('/api/entity', function (req, res) {
        // use mongoose to get all entity in the database
    	    Entity.find(function (err, entity) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    	        if (err) {
    	            res.send(err);
    	        }
                res.json(entity); // return all entity in JSON format
    	    });
    });

    // create entity and send back all entity after creation
    app.post('/api/entity', function (req, res) {
        console.log(req.body.text);
        let search = req.body.text;

        mongoose.connect(dbURL, function (err) {
        	if(err) {
        		console.error(err);
        	      res.statusCode = 500;
                mongoose.connection.close();
        	      return res.json({ errors: ['Error : Mongo Connection Error'] });

        	}
        	crawler.getGooglePlaceData(config.api, config.apikey, search, (data,err) => {
        		if(err) {
            		console.error(err);
            	      res.statusCode = 500;
                    mongoose.connection.close();
            	      return res.json({ errors: ['Error : Google Place API Error'] });
            	}
////        		EntityModel.saveAll(data,function(){
////            		res.statusCode = 200;
////            		return res.json({ mssage: ['Msg : All data inserted for ' + search] });
////        		})
//        		
////        		res.statusCode = 200;
////        		return res.json({ mssage: ['Msg : All data inserted for ' + search] });
////        		console.log(data);
//        		_.forEach(data, (ele)=>{
//        			console.log(ele);
//        			//console.log(Entity);
//        			Entity.create(
//            				ele, (err, ele) => {
//            					if(err)
//            					{
//            						res.send(err);
//            					}
//            			});
        		console.log(data);
        		Entity.insertMany(data)
	    		    .then(function(data) {
	    		    	//res.send({ mssage: ['Msg : All data inserted for ' + search] });
                        mongoose.connection.close();
	    		    })
	    		    .catch(function(err) {
	    		    	//res.send({ mssage: ['Error '] });
                        mongoose.connection.close();
	    		    });
        		
        		
        	})
        });
    });     

    // delete a entity
    app.delete('/api/entity/:entity_id', function (req, res) {
        Entity.remove({
            _id: req.params.entity_id
        }, function (err, entity) {
            if (err)
                res.send(err);

            getEntitys(res);
        });
    });
    
    
};
