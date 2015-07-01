'use strict';

describe('Controller: HowCtrl', function () {

  // load the controller's module
  beforeEach(module('codessesApp'));

  var HowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HowCtrl = $controller('HowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
