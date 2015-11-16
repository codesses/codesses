'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

          $urlRouterProvider
              .otherwise('/v1/home');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/v1',
                  templateUrl: '/views/account/app.html'
              })
              .state('app.dashboard-v1', {
                  url: '/home',
                  templateUrl: '/views/account/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['/scripts/account/controllers/chart.js']);
                    }]
                  }
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })
              .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: '/views/account/page_profile.html'
              })
              .state('app.page.post', {
                  url: '/post',
                  templateUrl: '/views/account/page_post.html'
              })
              .state('app.page.search', {
                  url: '/search',
                  templateUrl: '/views/account/page_search.html'
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: '/views/account/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: '/views/account/page_404.html'
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/tasks',
                  templateUrl: '/views/account/app_calendar.html',
                  // use resolve to load other dependences
                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            ['../scripts/vendor/jquery/fullcalendar/fullcalendar.css',
                              '../scripts/vendor/jquery/fullcalendar/theme.css',
                              '../scripts/vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                              '../scripts/vendor/libs/moment.min.js',
                              '../scripts/vendor/jquery/fullcalendar/fullcalendar.min.js',
                              '../scripts/account/app/calendar/calendar.js']
                          ).then(
                            function(){
                              return $ocLazyLoad.load('ui.calendar');
                            }
                          );
                      }]
                  }
              })

              // mail
              .state('app.mail', {
                  abstract: true,
                  url: '/mail',
                  templateUrl: '/views/account/mail.html',
                  // use resolve to load other dependences
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['scripts/account/app/mail/mail.js',
                                               'scripts/account/app/mail/mail-service.js',
                                               'scripts/vendor/libs/moment.min.js'] );
                      }]
                  }
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: '/views/account/mail.list.html'
              })
              .state('app.mail.detail', {
                  url: '/{mailId:[0-9]{1,4}}',
                  templateUrl: '/views/account/mail.detail.html'
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: '/views/account/mail.new.html'
              })
              .state('apps', {
                  abstract: true,
                  url: '/hub',
                  templateUrl: '/views/account/layout.html'
              })
              .state('apps.note', {
                  url: '/pair',
                  templateUrl: '/views/account/apps_note.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['scripts/account/app/note/note.js',
                                               'scripts/vendor/libs/moment.min.js'] );
                      }]
                  }
              })
              .state('apps.contact', {
                  url: '/chat',
                  templateUrl: '/views/account/apps_contact.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['scripts/account/app/contact/contact.js'] );
                      }]
                  }
              });
      }
    ]
  );