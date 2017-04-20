angular.module('userControllers', [])

.controller('regCtrl',['$scope','$http', function($scope, $http) {
  $scope.regdata = {};
  $scope.regUser = function(regData){
    console.log("form submitted");
    console.log(regData);
    $http.post('/api/users',regData).then(function(data){
      console.log(data);
    })
  }
}])
