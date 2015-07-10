'use strict';

angular.module('birthdayApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.newUser = {}
    $scope.createUser = function(){
      $http.post('/api/users/', $scope.newUser).success(function(data){
        console.log(data)
        $scope.newUser = {
          name: '',
          id: ''
        }
      })
    }
    $scope.changeId = function(id){
      var fbId = window.prompt("New fb id?");
      if(fbId){
        $http.post('/api/users/addId/' + id, {fbId: fbId}).success(function(saved){
          console.log(saved)
        })
      }
    }
    $scope.reroll = function(){
      console.log('done')
      $http.post('/api/users/reroll/').success(function(data){
        $scope.users = data;
      })
    }
    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
