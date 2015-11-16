'use strict';

/**
 * @ngdoc service
 * @name codessesApp.saveUser
 * @description
 * # saveUser
 * Service in the codessesApp.
 */
angular.module('codessesApp')
  .service('saveUser', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var data = {};
    data.list = [];

    data.add = function(user) {
        data.list.push(user);
    };

    return data.list;

  });