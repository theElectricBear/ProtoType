// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngAnimate', 'ngIOS9UIWebViewPatch'])

.run(function($ionicPlatform, $rootScope, $ionicConfig, $ionicPopup, filterFilter) {

  $ionicPlatform.ready(function($ionicConfigProvider) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.overlaysWebView(true);
      StatusBar.style(1);
    }
   $ionicConfig.views.transition('none');

  });
})



.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/shell.html',
    controller: 'AppCtrl'
  })

  .state('app.pass', {
    url: '/pass',
    cache: false,
    views: {
      'mainContent': {
        templateUrl: 'templates/pass.html',
        controller: 'Pass'
      }
    }
  })

  // .state('app.pass2', {
  //   url: '/pass2',
  //   cache: false,
  //   views: {
  //     'mainContent': {
  //       templateUrl: 'templates/pass2.html',
  //       controller: 'Pass'
  //     }
  //   }
  // })

  // .state('app.pass3', {
  //   url: '/pass3',
  //   cache: false,
  //   views: {
  //     'mainContent': {
  //       templateUrl: 'templates/pass3.html',
  //       controller: 'Pass'
  //     }
  //   }
  // })

  .state('app.landing', {
      url: '/landing/:call',
      cache: false,
      views: {
        'mainContent': {
          templateUrl: 'templates/landing_page.html',
          controller: 'LandingPage'
        }
      }
    })

  .state('app.change-data-plan', {
    url: '/change-data-plan/:call',
    cache: false,
    views: {
      'mainContent': {
        templateUrl: 'templates/change_data_plan.html',
        controller: 'ChangeDataPlan'
      }
    }
  })

  .state('app.usage-details', {
    url: '/usage-details',
    cache: false,
    views: {
      'mainContent': {
        templateUrl: 'templates/usage_details.html',
        controller: 'UsageDetails'
      }
    }
  })

  .state('app.plan-details', {
    url: '/plan-details',
    cache: false,
    views: {
      'mainContent': {
        templateUrl: 'templates/plan_details.html',
        controller: 'PlanDetails'
      }
    }
  })

  .state('app.alerts', {
    url: '/alerts',
    cache: false,
    views: {
      'mainContent': {
        templateUrl: 'templates/alerts.html',
        controller: 'Alerts'
      }
    }
  })

  .state('app.one-time-payment', {
    url: '/one-time-payment/:call',
    cache: false,
    views: {     
      'mainContent': {
        templateUrl: 'templates/one_time_payment.html',
        controller: 'OneTimePayment'
      }
    }
  })

  .state('app.billing-details', {
    url: '/billing-details',
    cache: false,
    views: {   
      'mainContent': {
        templateUrl: 'templates/billing_details.html',
        controller: 'BillingDetails'
      }
    }
  })

  .state('app.general-profile', {
    url: '/general-profile',
    cache: false,
    views: {      
      'mainContent': {
        templateUrl: 'templates/general_profile.html',
        controller: 'GeneralProfile'
      }
    }
  })

  .state('app.map', {
    url: '/map',
    cache: false,
    views: {     
      'mainContent': {
        templateUrl: 'templates/map.html',
        controller: 'Map'
      }
    }
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/pass');



});
