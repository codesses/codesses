'use strict';
/**
 * @ngdoc function
 * @name codessesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('codessesApp')
  .controller('LoginCtrl', ['$scope', '$localStorage', '$firebaseObject', 'Auth', '$location', '$q', 'Ref', function ($scope, $localStorage, $firebaseObject, Auth, $location, $q, Ref, $timeout, ngDialog) {

    var user = Auth.$getAuth();
    if (user) {
      location.href = '/profile';
    }

    $scope.remember = true;
    $scope.usertype = $localStorage.usertype;

    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {rememberMe: $scope.remember}).then(redirect, showError);
    };

    var redirect = function(user){
      $scope.profile = $firebaseObject(Ref.child('profile/' + user.uid));
      $scope.profile.$loaded().then(function() {
        if ($scope.profile.isValid) {
          window.location.href = '/profile';
          return 0;
        }
        $location.path('/complete');
      }, function () {
        $location.path('/login');
      });
    };

    var showError = function(err){
        console.log(err);
        $scope.err = 'Something bad happened, please try again.';
    };
  }]);
