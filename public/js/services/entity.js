angular.module('entityService', [])

	// super simple service
	// each function returns a promise object 
	.factory('entity', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/entity');
			},
			create : function(entity) {
				return $http.post('/api/entity', entity);
			},
			delete : function(id) {
				return $http.delete('/api/entity/' + id);
			}
		}
	}]);