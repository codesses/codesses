angular.module('firebase.config', [])
  .constant('FBURL', 'https://codesses.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google','twitter'])

  .constant('loginRedirectPath', '/login');
