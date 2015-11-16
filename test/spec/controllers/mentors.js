'use strict';

describe('Controller: MentorsCtrl', function () {

  // load the controller's module
  beforeEach(module('codessesApp'));

  var MentorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MentorsCtrl = $controller('MentorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
