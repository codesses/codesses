'use strict';

/**
 * @ngdoc function
 * @name codessesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codessesApp
 */
angular.module('codessesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
