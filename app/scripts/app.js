'use strict';

/**
* @ngdoc overview
* @name codessesApp
* @description
* # codessesApp
*
* Main module of the application.
*/
var app = angular.module('codessesApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngStorage',
  'firebase',
  'firebase.ref',
  'firebase.auth',
  'ngDialog'
]);


app.controller('AppCtrl',['$scope', '$location', '$localStorage', 'Auth', function ($scope, $location, $localStorage, Auth) {


    var user = Auth.$getAuth();
    // console.log(user);
    if (user) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    };

    $scope.mentor = function () {
        $localStorage.usertype = true;
        $location.path('/login');
    };
    $scope.mentee = function () {
        $localStorage.usertype = false;
        $location.path('/login');
    };

    if ( angular.isDefined($localStorage.usertype) ) {
      $scope.usertype = $localStorage.usertype;
    } else {
      $localStorage.usertype = false;
    }


  }]);
