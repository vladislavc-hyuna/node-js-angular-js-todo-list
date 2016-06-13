var taskApp = angular.module('TaskApp', ['ngRoute'])

.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "../tasks.html",
      controller: "TaskController",
      controllerAs: "task"
    }
  )
   .when("/new", {
    templateUrl: "../new_task.html",
  })
  .when("/tasks/:id", {
    templateUrl: "../detail.html",
     controller: "DetailTaskController",
     controllerAs: "task"
  })
  .when("/tasks/:id/edit", {
    templateUrl: "../new_task.html",
    controller: "EditTaskController",
    controllerAs: "task"
  })
  .otherwise('/');
})

taskApp.controller('TaskController', function TaskController($scope, $http) {
  $http.get('/api/tasks').then(function successCallback(response){
      $scope.tasks =response.data.body;
  }, function errorCallback(response){
     console.log(response);
  });

});


taskApp.controller('DetailTaskController', function TaskController($scope, $http, $location) {
  var id = $location.path().split("/")[2];
  $scope.submitForm = function() {
    $http.delete('/api/tasks/' + id).then(function successCallback(response){
      $location.path('/');
    }, function errorCallback(response){
      console.log(response);
    });
  };

  $http.get('/api/tasks/' + id).then(function successCallback(response){
    console.log(response.data.body[0]);
      $scope.task =response.data.body[0];
  }, function errorCallback(response){
     console.log('error');
  });
});

taskApp.controller('NewTaskController', function TaskController($scope, $http, $location) {
  $scope.tasks = {};
  $scope.submitForm = function() {
  $http({
    method  : 'POST',
    url     : '/api/tasks',
    data    : $.param({data: $scope.task}),
    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
   })
    .then(function(success) {
      $location.path('/');
    }, function(error) {
      $location.path('/');
    })
  };
});


taskApp.controller('EditTaskController', function TaskController($scope, $http, $location){
  var id = $location.path().split("/")[2];
  $scope.submitForm = function() {
    $http({
      method  : 'PUT',
      url     : '/api/tasks/' + id,
      data    : $.param({data: $scope.task}),
      headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
     })
      .then(function(success) {
        $location.path($location.path());
      }, function(error) {
        $location.path($location.path());
      })
    };

   $http.get('/api/tasks/' + id).then(function successCallback(response){
      $scope.task =response.data.body[0];
  }, function errorCallback(response){
     console.log('error');
  });
});







