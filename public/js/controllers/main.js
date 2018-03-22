angular.module('entityController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','entity', function($scope, $http, entity) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.success = false;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		entity.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
				$scope.success = true;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createEntity = function() {

//			console.log("Create player entry");
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				entity.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						console.log(data);
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.entity = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteEntity = function(id) {
			$scope.loading = true;

			entity.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.entity = data; // assign our new list of todos
				});
		};


		
	}]);