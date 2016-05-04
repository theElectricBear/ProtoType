angular.module('starter.controllers', [])

.factory('MenuStatus', function(){
        return { _isOpen: '' };
  
})

.factory('NewAlerts', function(){
        return { 
                  _new: 4,
                  _alerts : []
               };
  
})

.factory('DataPlanFactory', function(){

        return {  currentCode : '001-13GBHSD',
                  baseCost : '269.99',
                  newTotal: '279.99',
                  currentTotal : '329.99',
                  newCode : '',
                  newPlan : '',
                  removedPlan : '' };
  
})

.factory('OneTimePayment', function(){
        return {  user : 'Alexandria Smith',
                  balance : "$100.00",
                  amount : '',
                  payment : 'balance',
                  payAmount : '',
                  payOn : '',
                  payMethod : '' ,
                  newCard : {
                    name : '',
                    cardNumber : '',
                    cvv : '',
                    exMonth : '',
                    exYear : '',
                    zip : '',
                    save: false
                  },
                  newChecking : {
                    name : '',
                    routeNumber : '',
                    acctNumber : '',
                    save: false
                  }
                };
  
})



.controller('AppCtrl', function($scope, $state, $rootScope, $timeout, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicHistory, MenuStatus, NewAlerts, filterFilter) {
  
  $rootScope._alerts  = [ { class : "new1", status : "closed", newAlert : true}, { class : "new1", status : "closed", newAlert : true}, { class : "new3", status : "closed", newAlert : true}, { class : "new1", status : "closed", newAlert : true},
  { class : "read1", status : "closed", newAlert : false }, { class : "read1", status : "closed", newAlert : false}, { class : "read3", status : "closed", newAlert : false}  ];
  $rootScope._newAlerts = filterFilter( $rootScope._alerts, {newAlert: true}).length;
  
    $rootScope.nav = true;

    
    $rootScope.goBackTo = 'home';
    $rootScope.goBack = function(){
      

      var backState = $rootScope.backState;
      var backCall = $rootScope.backCall;

      console.log(backState);

      if($rootScope.goBackTo == "home"){
        $rootScope.showBack = false;
        $state.go('app.landing', {'call':'home'});
      }else if($rootScope.goBackTo == "back"){
        $rootScope.showBack = true;
        $rootScope.goBackTo = "home";
        $ionicHistory.goBack();
      }else if($rootScope.goBackTo == "last"){
        $rootScope.showBack = true;
        $rootScope.goBackTo = "home";
        $state.go( backState , {'call': backCall});

      }
    };

  MenuStatus._isOpen = false;
  $scope.menuStatus = MenuStatus;

  $scope.goTo = function(ae, ea){

    $rootScope.backState = $ionicHistory.currentView().stateName;
    if($ionicHistory.currentView().stateParams != null ){
      $rootScope.backCall = $ionicHistory.currentView().stateParams.call;
    };
    $state.go('app.' + ae, { 'call' : ea });
  };



  $scope.$watch(function () {
      return $ionicSideMenuDelegate.isOpenLeft();
    },
      function (isOpen) {
        if (isOpen){
          MenuStatus._isOpen = true;
        }else if(!isOpen){
          MenuStatus._isOpen = false;
        }
  });


  var closeMenu = function(){
      console.log(MenuStatus._isOpen);
      MenuStatus._isOpen = false;
  };

  $scope.closeMenu = function(){
    closeMenu();
  };

  $scope.state = $state;
  $scope.menuItems = [
              {
                title: "Home",                
                call: "home",
                click: "closeMenu();goTo('landing','home')",
              },

              {
                title: "Alerts",                
                call: "alerts",
                href: "#/app/alerts",
                click: "closeMenu();goTo('alerts','home')",
                badge : true,
              },
        
              {
                title: "Billing & Payments",
                call: "billing",
                href: "#/app/landing/billing",
                click: "closeMenu();goTo('landing','billing');"
              },

              {
                title: "Usage & Plans",
                call: "usage",
                href: "#/app/landing/usage",
                click: "closeMenu();goTo('landing','usage');"
              },

              {
                title: "Profile Settings",
                call: "profile",
                href: "#/app/landing/profile",
                click: "closeMenu();goTo('landing','profile');"
              },

              {
                title: "Store Locator",                
                call: "store-locator",
                href: "#/app/map",
                click: "closeMenu();goTo('map','');",
              },

              {
                title: "Support",
                call: "support",
                href: "#/app/landing/support",
                click: "closeMenu();goTo('landing','support');"
              },
                
              {
                title: "App Settings",                
                call: "app-settings",
                href: "#/app/landing/app-settings",
                click: "closeMenu();goTo('landing','app-settings');",
              },
        
              {
                title: "About",                
                call: "about",
                href: "#/app/landing/about-the-app",
                click: "closeMenu();goTo('landing','about');",
              }
  ];


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

})

.controller('Pass', function($scope, $rootScope, $stateParams, $state ) {
  $rootScope.nav = false;

  // $scope.formHide = true;

  $scope.gif = 'gifShow';
  // $scope.logo = 'formHide';
  // setTimeout(function(){ 
  //   $scope.logo = 'formShow'; 
  //   $scope.formHide = false; 
  // }, 500);
  setTimeout(function(){  
    $state.go('app.landing', {"call":"home"});
    $rootScope.nav = true;
  }, 3000);

})

.controller('LandingPage', function($scope, $rootScope, $stateParams, $state, $http, MenuStatus) {
  $rootScope.nav = true;

    var call = $stateParams.call;

    
    if (call == 'home'){
      $rootScope.showBack = false;
    }else{
      $rootScope.showBack = true;
      $rootScope.goBackTo = 'home';
    };

    var pages = {}; 
    $http.get('js/pages.json').success(function(data, pages){
      pages = data;
      $scope.page = pages[call];
      $scope.call = call;
      $scope.title = pages[call].title;
    });
    
})

.controller('ChangeDataPlan', function($scope, $rootScope, $stateParams, $state, $http, $ionicHistory, DataPlanFactory) {
    var call = $stateParams.call;
    $scope.call = call;
    
    $scope.changeDataPlan = DataPlanFactory;

    if(call == 'confirm'){
      $rootScope.showBack = false;
    }else if(call == 'review'){
      $rootScope.showBack = true;
      $rootScope.goBackTo = 'back';
    }else if(call == 'select'){
      $rootScope.showBack = true;
      $rootScope.goBackTo = 'last';
    };

   

    $scope.dataCodes = {newCode : DataPlanFactory.newCode,
                        currentCode : DataPlanFactory.currentCode
                        };
    $http.get('js/data_plans.json').success(function(data){
      $scope.dataPlans = data;
      if(selected){
        $scope.dataPlans.plans[selected].selected = true;

      }

    });
    if($scope.dataCodes.newCode){
      var selected = $scope.dataCodes.newCode;
    };



    $scope.changePlan = function(){
      DataPlanFactory.removedPlan = $scope.dataPlans.plans[$scope.dataCodes.currentCode];
      DataPlanFactory.newPlan = $scope.dataPlans.plans[$scope.dataCodes.newCode];
      DataPlanFactory = $scope.changeDataPlan;

    };

    $scope.select = function(){

      $state.go('app.change-data-plan', {"call" : 'select'});
    };

     $scope.review = function(){

      $state.go('app.change-data-plan', {"call" : 'review'});
    };

    $scope.confirm = function(){
      $state.go('app.change-data-plan', {"call" : 'confirm'});
    };

    $scope.home = function(){
      $state.go('app.landing', {"call" : 'home'});
    };

})

.controller('UsageDetails', function($scope, $rootScope, $stateParams, $ionicHistory ) {
    $rootScope.showBack = true;
    $rootScope.goBackTo = 'back';

})

.controller('PlanDetails', function($scope, $rootScope, $stateParams, $ionicHistory ) {
    $rootScope.showBack = true;
    $rootScope.goBackTo = 'back';

})

.controller('Alerts', function($scope, $rootScope, $stateParams, $state, filterFilter, NewAlerts) {
  $rootScope.nav = true;
  $scope.name = 'alerts'
  
  $scope.alerts = $rootScope._alerts;
  $rootScope._newAlerts = filterFilter( $rootScope._alerts, {newAlert: true}).length;
  $scope.newAlerts = $rootScope._newAlerts;


    $rootScope.showBack = true;
    $rootScope.goBackTo = 'home';

    $scope.swapClass = function (alert) {
        switch (alert.class) {
          case "new1":
              alert.class = "new2";
              alert.status = "open";
              break;
          case "new2":
              alert.class = "read1";
              alert.status = "closed";
              alert.newAlert = false;
              break;
          case "new3":
              alert.class = "new4";
              alert.status = "open";
              break;
          case "new4":
              alert.class = "read3";
              alert.status = "closed";
              alert.newAlert = false;
              break;
          case "read1":
              alert.class = "read2";
              alert.status = "open";
              break;
          case "read2":
              alert.class = "read1";
              alert.status = "closed";
              break;
          case "read3":
              alert.class = "read4";
              alert.status = "open";
              break;
          case "read4":
              alert.class = "read3";
              alert.status = "closed";
              break;
          }
        $rootScope._newAlerts = filterFilter( $rootScope._alerts, {newAlert: true}).length;
        $scope.newAlerts = $rootScope._newAlerts;
        $scope.alertCount = $rootScope._alerts.length;          
    }

    $scope.goToPayment = function(){
      $state.go('app.one-time-payment', {"view" : 'pay'});
    };

    $scope.deleteAlert = function (alert) {
        var index = $rootScope._alerts.indexOf(alert);
        if (index != -1) {
          $rootScope._alerts.splice(index, 1);
          $rootScope._newAlerts = filterFilter( $rootScope._alerts, {newAlert: true}).length;
          $scope.newAlerts = $rootScope._newAlerts;
          $scope.alertCount = $rootScope._alerts.length;
        }
        

    }

})

.controller('LineDetails', function($scope, $rootScope, $stateParams, $ionicHistory) {
    $rootScope.showBack = true;
    $rootScope.goBackTo = 'home';
})

.controller('Map', function($scope, $rootScope, $state, $ionicScrollDelegate, $timeout ) {
    $rootScope.showBack = true;
    $rootScope.goBackTo = 'home';

    $timeout(function() {
     $ionicScrollDelegate.$getByHandle('mapImage').scrollTo(990, 440, false);

    }, 0);

})

.controller('OneTimePayment', function($scope, $rootScope, $stateParams, $state, $ionicHistory, OneTimePayment) {
    var call = $stateParams.call;
    $scope.call = call;

    if(call == 'confirm'){
      $rootScope.showBack = false;
    }else if(call == 'review'){
      $rootScope.showBack = true;
      $rootScope.goBackTo = 'back';
    }else if(call == 'pay'){
      $rootScope.showBack = true;
      $rootScope.goBackTo = 'last';
    };

    $scope.oneTimePayment = OneTimePayment;
    $scope.oneTimePayment.otherAmount = $scope.oneTimePayment.balance;
    $scope.oneTimePayment.paymentAmount = $scope.oneTimePayment.balance;

    $scope.changeAmount = function(){
          if($scope.oneTimePayment.payment == 'other'){
            $scope.oneTimePayment.paymentAmount = $scope.oneTimePayment.otherAmount;

          }else{
            $scope.oneTimePayment.paymentAmount = $scope.oneTimePayment.balance;

          }
        };


    $scope.oneTimePayment.payOn = new Date();
    $scope.oneTimePayment.paymentType = "storedPayment";

    $scope.newCard = OneTimePayment.newCard;
    $scope.newChecking = OneTimePayment.newChecking;


    $scope.pay = function(){
      $state.go('app.one-time-payment', {"call" : 'pay'});
    };

    $scope.review = function(){
      $state.go('app.one-time-payment', {"call" : 'review'});
    };

    $scope.confirm = function(){
      $state.go('app.one-time-payment', {"call" : 'confirm'});
    };

})

.controller('BillingDetails', function($scope, $rootScope, $stateParams, $state ) {
    $rootScope.showBack = true;
    $rootScope.goBackTo = 'last';
})

.controller('GeneralProfile', function($scope, $rootScope, $stateParams, $state ) {
    $rootScope.showBack = true;
    $rootScope.goBackTo = 'last';
})

