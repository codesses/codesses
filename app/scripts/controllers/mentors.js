'use strict';

/**
 * @ngdoc function
 * @name codessesApp.controller:MentorsCtrl
 * @description
 * # MentorsCtrl
 * Controller of the codessesApp
 */
angular.module('codessesApp')
  .controller('MentorsCtrl', ['Auth', 'Ref', '$scope', function (Auth, Ref, $scope) {
    var ref = Ref.child('profiles');
    ref.orderByChild("group").equalTo("Mentor").on("child_added", function(data) {
        $scope.mentors = data.val();
    });
  }]);
