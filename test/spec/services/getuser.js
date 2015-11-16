'use strict';

describe('Service: getUser', function () {

  // load the service's module
  beforeEach(module('codessesApp'));

  // instantiate service
  var getUser;
  beforeEach(inject(function (_getUser_) {
    getUser = _getUser_;
  }));

  it('should do something', function () {
    expect(!!getUser).toBe(true);
  });

});
