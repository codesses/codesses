'use strict';

/* Controllers */
angular.module('app')
  .controller('AppCtrl', ['$rootScope', '$scope', '$firebaseObject', '$firebaseArray', '$translate', '$localStorage', 'Auth', 'getUser', 'Ref', '$window',
    function($rootScope, $scope, $firebaseObject, $firebaseArray, $translate, $localStorage, Auth, getUser, Ref, $window ) {

      var auth = Auth.$getAuth();
      if (!auth) {
        window.location.href = '/';
      } else {
        $scope.user = getUser.byId(auth);
      };

      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
      // config
      var connection = Ref.child(".info/connected");
      connection.on("value", function(snap) {
        var user = Ref.child('profile/'+ auth.uid);
        if (snap.val() === true) {
          $scope.status = 'on';
          user.update({"status": "on"});

        } else{
          user.update({"status": "off"});
          $scope.status = 'off';
        };
      });

      $scope.logout = function() {
        var user = Ref.child('profile/'+ auth.uid);
        user.set({"status": "off"});
        Auth.$unauth();
        location.href = '/';
        return 0;
      };

      // console.log(auth, Auth);
      $rootScope.profiles = [];
      var users = $firebaseArray(Ref.child('profile'));
      users.$loaded().then(function (data) {
        angular.forEach(data, function(val, key) {
          if (val.username === $scope.user.username) {
            // console.log(val);
          } else{
            $rootScope.profiles[0] = val;
          };
        });
      });

      $scope.app = {
        name: 'The Codesses',
        version: '0.0.1',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: true,
          asideDock: false,
          container: false
        },
        // Mentor flag
        mentor: $localStorage.usertype
      };
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      $scope.oauthLogin = function(provider) {
        $scope.err = null;
        Auth.$authWithOAuthPopup(provider, {rememberMe: $scope.remember}).then(redirect, showError);
      };

      var redirect = function(user){
        var profile = $firebaseObject(Ref.child('profile/' + user.uid));
        if (profile.isValid) {
          $localStorage.user = profile;
          location.href = '/profile';
        }
        $location.path('/complete');
      };

      var showError = function(err){
          console.log(err);
      };

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian', fr_FR:'French'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || 'English';
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      };
    /* event source that contains custom events on the scope */
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $rootScope.events = [
      {title:'Preliminary submissions', start: new Date(y, 6, 15), allDay: true, className: ['bg bg-danger'], location:'Online', info:'Submission of preliminary apps for assessment'},



      {title:'Mentorship Assignment', start: new Date(y, 6, 16), end: new Date(y, 6, 18), allDay: true, className: ['bg bg-success'], location:'Online', info:'Teams of Codesses are assigned to mentors.'},


      {title:'Team project commences', start: new Date(y, 6, 20), allDay: true, className: ['bg bg-primary'], location:'Online', info:'Teams begin work on a project.'},


      {title:'Submit team project', start: new Date(y, 7, 7), allDay: true, className: ['bg bg-danger'], location:'Online', info:'Team project submission.'},

      {title:'Announcements', start: new Date(y, 7, 10), allDay: true, className: ['bg bg-success'], info:'Successful participants are invited to Lagos, Niger for the final hackathon'},

      {title:'Hackathon', start: new Date(y, 7, 15), allDay: true, className: ['bg-primary bg'], location:'Lagos, Nigeria', info:'Successful participants engage in a full day all female hakathon.'}
    ];

  }])