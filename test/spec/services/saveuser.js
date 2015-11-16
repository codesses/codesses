'use strict';

describe('Service: saveUser', function () {

  // load the service's module
  beforeEach(module('codessesApp'));

  // instantiate service
  var saveUser;
  beforeEach(inject(function (_saveUser_) {
    saveUser = _saveUser_;
  }));

  it('should do something', function () {
    expect(!!saveUser).toBe(true);
  });

});
