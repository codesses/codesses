'use strict';

/**
 * @ngdoc function
 * @name codessesApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the codessesApp
 */
angular.module('codessesApp')
  .controller('RegisterCtrl', function ($scope, $localStorage, user, Auth, Ref, $q, $firebaseObject, $timeout, $location, getUser, saveUser) {
    $scope.messages = [];
    if (!user) {
      $location.path('/login');
    };

    $scope.isValid = false;

    var mentor = $localStorage.usertype;

    var profile = $firebaseObject(Ref.child('profile/' + user.uid));
    profile.$loaded().then(function() {
      if (profile.isValid) {
        window.location.href = '/profile';
        return 0;
      }
    });

    var users = Ref.child('users/'+user.uid)

    users.set(user);
    $scope.user = getUser.byId(user);
    $scope.complete = false;

    $scope.createProfile = function() {
      var obj = $scope.user;
      obj.isValid = true;
      var users = Ref.child('profile/' + user.uid);
      users.set(obj, function(err) {
        if( err ) {
          $scope.err = error;
        } else {
          $scope.complete = true;
          saveUser.add($scope.user);        }
      });
    }

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

  });
