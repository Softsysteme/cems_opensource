angular.module('starter.controllers', ['c8o.services'])

// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, c8oService) {
  c8oService.call(
	  ".GetPets"
  ).then(function (data) {
	  $scope.pets = data.pets;
  });
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, c8oService) {
  	c8oService.call(
  		".GetPetDetails",
		{"id": $stateParams.petId }
	).then(function (data) {
		$scope.pet = data.pet;
  });
});
