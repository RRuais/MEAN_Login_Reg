var mainApp = angular.module('mainApp', ['ngRoute', 'ngCookies']);

//Angular Routes
mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/_loginReg.html',
            controller: 'UsersController'
        })
        .when('/users', {
            templateUrl: 'partials/_usersShowAll.html',
            controller: 'UsersController'
        })
        .when('/users/:id', {
            templateUrl: 'partials/_usersShow.html',
            controller: 'UsersController'
        })
}]);

//Angular Controllers
mainApp.controller('UsersController', ['$scope', 'UsersFactory', '$location', '$route', '$cookies', function($scope, uf, $location, $route, $cookies) {

    $scope.register = function() {
      if ($scope.regModel.password != $scope.regModel.cPassword){
    			$scope.errors = { password: {message: "Password and Password Confirmation must match"}}
    		}
        uf.register($scope.regModel, function(user) {
          if(user.data.errors) {
            console.log(user.data.errors);
            $scope.errors = user.data.errors.login_reg;
            console.log($scope.errors);
          }
            uf.getUsers(function(users) {
              if (users.data.errors){
      					$scope.errors = users.data.errors;
                $scope.regModel = {};
      				}else {
                $scope.users = users.data;
                $scope.regModel = {};
                $location.url('/users');
              }
            });
          });

    };

    $scope.login = function() {
      uf.login($scope.logModel, function(user) {
        if(user.data.errors) {
          $scope.errors = user.data.errors.login_reg;
          $location.url('/');
        } else {
          $scope.user = user.data;
          $location.url('/users');
        }

      });
    };

    $scope.getUsers = function() {
        uf.getUsers(function(users) {
            $scope.users = users.data;
        });
    };


    $scope.findUser = function(user, callback) {
        uf.findUser(user, function(user) {
          $scope.user = user.data[0];
          $location.url('/users/'+user.email);
        });
    };

    $scope.deleteUser = function(user, callback) {
      uf.delete(user, function() {
        uf.getUsers(function(users) {
            $scope.users = users.data;
        });
      })
    };

}]);// End User Controller


//Angular Factory
mainApp.factory('UsersFactory', ['$http', '$location', function($http, $location) {
    var factory = {}

    factory.register = function(newUser, callback) {
        $http.post('/register', newUser)
            .then(function(user) {
              callback(user);
            });
    };

    factory.login = function(newUser, callback) {
      $http.post('/login', newUser)
          .then(function(response) {
            console.log(response);
            callback(response);
          });
    }

    factory.getUsers = function(callback) {
        $http.get('/users')
            .then(callback);
    };

    factory.findUser = function(user, callback) {
      $http.get('/users/'+user._id, user)
        .then(function(data) {
          callback(data);
        });
    };

    factory.delete = function(user, callback) {
      $http.delete('/users/'+user._id+'/delete', user)
        .then(function(data) {
          callback();
        });

    };

    return factory;
}]);
