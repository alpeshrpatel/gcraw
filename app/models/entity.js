

var mongoose = require('mongoose');

var EntitySchema = mongoose.Schema({
	  	name: {
		    type	: String
	  	},
	  	place_id: {
		    type	: String
	  	},
	  	address :{
			type	: String,
	  	},
	  	phone: [{
			type	: String
		}],
		website:{
			type	: String
		},
		 email: [{
		 	type	: String
		   }],
	  	rating :{
		  type:Number
		  },
		// opening_hours:  {
			
		// },
	  	picture :{
		  type	: String
	  	},
	  	tag: [{
		    type	: String
	 	}],
	  	mapurl :{
			type	: String
	  	},
	  	about :{
			type	: String
	  	},
	  	createddate: {
			type	: Date,
			default	: Date.now
	  	},
	  	modifieddate: {
		    type	: Date,
		    default	: Date.now
	  	},
		createdby: {
			type	: String,
			default	: 'SYSTEM'
		},
		modifiedby: {
			type	: String,
			default	: 'SYSTEM'
		},
		status :
		{
			type: Number // 0 - deactivtae, 1 - activate,  2- 3 -4 
		}
  
});




module.exports.create = function(entity, callback){
	console.log(entity);
	EntityModel.create(entity, callback);
}
/**
*Create User Model
*/
var EntityModel = mongoose.model('Entity', EntitySchema);
//==============================================================================
/**
*Export Module
*/
module.exports = EntityModel;
//==============================================================================