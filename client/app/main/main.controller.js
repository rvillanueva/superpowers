'use strict';

angular.module('birthdayApp')
  .controller('MainCtrl', function ($scope, $http, User) {

    $scope.me = User.get();

    $scope.userIndex = {};

    $scope.users = User.query();

    User.query(function(users){
      angular.forEach(users, function(user, index){
        if(user.facebook){
          $scope.userIndex[user._id] = user
        }
      })
    });

  });
