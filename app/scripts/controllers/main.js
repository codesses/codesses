'use strict';

/**
 * @ngdoc function
 * @name codessesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codessesApp
 */
angular.module('codessesApp')
  .controller('MainCtrl',['$scope', '$localStorage', 'saveUser', 'Auth', function ($scope, $localStorage , saveUser, Auth) {

    var user = Auth.$getAuth();
    // console.log(user);
    if (user) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    };

  }]);
