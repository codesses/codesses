// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['scripts/vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['scripts/vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['scripts/vendor/jquery/charts/flot/jquery.flot.min.js',
                          'scripts/vendor/jquery/charts/flot/jquery.flot.resize.js',
                          'scripts/vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'scripts/vendor/jquery/charts/flot/jquery.flot.spline.js',
                          'scripts/vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          'scripts/vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['scripts/vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['scripts/vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['scripts/vendor/jquery/nestable/jquery.nestable.js',
                          'scripts/vendor/jquery/nestable/nestable.css'],
      filestyle:      ['scripts/vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['scripts/vendor/jquery/slider/bootstrap-slider.js',
                          'scripts/vendor/jquery/slider/slider.css'],
      chosen:         ['scripts/vendor/jquery/chosen/chosen.jquery.min.js',
                          'scripts/vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['scripts/vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'scripts/vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['scripts/vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'scripts/vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['scripts/vendor/jquery/datatables/jquery.dataTables.min.js',
                          'scripts/vendor/jquery/datatables/dataTables.bootstrap.js',
                          'scripts/vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['scripts/vendor/jquery/jvectormap/jquery-jvectormap.min.js',
                          'scripts/vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'scripts/vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'scripts/vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['scripts/vendor/jquery/footable/footable.all.min.js',
                          'scripts/vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      'scripts/vendor/modules/ng-grid/ng-grid.min.js',
                      'scripts/vendor/modules/ng-grid/ng-grid.min.css',
                      'scripts/vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      'scripts/vendor/modules/angular-ui-select/select.min.js',
                      'scripts/vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    'scripts/vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['/scripts/vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      'scripts/vendor/modules/ngImgCrop/ng-img-crop.js',
                      'scripts/vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'scripts/vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      'scripts/vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      'scripts/vendor/modules/angularjs-toaster/toaster.js',
                      'scripts/vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'scripts/vendor/modules/textAngular/textAngular-sanitize.min.js',
                      'scripts/vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      'scripts/vendor/modules/angular-slider/angular-slider.min.js',
                      'scripts/vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      'scripts/vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      'scripts/vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      'scripts/vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      'scripts/vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      'scripts/vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      'scripts/vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }
          ]
      });
  }])
;