'use strict';

angular.module('core').controller('AuthenticationController', ['$ionicLoading','$cordovaOauth','$cordovaNetwork','$ionicPopup','$timeout','$rootScope','$scope', '$state', '$http', '$location', '$window', 'Authentication','ApiUrl','$ionicHistory',
  function ($ionicLoading,$cordovaOauth,$cordovaNetwork,$ionicPopup,$timeout,$rootScope,$scope, $state, $http, $location, $window, Authentication,ApiUrl,$ionicHistory) {
    var vm=this;
    vm.credentials={};
    vm.authentication = Authentication;
    vm.isAuthenticated=Authentication.isAuthenticated;
    vm.url=ApiUrl.url;


/*
    document.addEventListener("deviceready", function () {

      var type = $cordovaNetwork.getNetwork();

      var isOnline = $cordovaNetwork.isOnline();

      var isOffline = $cordovaNetwork.isOffline();

      alert(isOnline);

      // listen for Online event
      $rootScope.$on('networkOnline', function(event, networkState){
        var onlineState = networkState;
        alert('online');
      });

      // listen for Offline event
      $rootScope.$on('networkOffline', function(event, networkState){
        var offlineState = networkState;
        alert('offline');

      })

    }, false);
*/

    $scope.show = function(message) {

      var msg=message||'Loading...';
      $ionicLoading.show({
        template: msg,
        duration: 3000
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
    };
    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    };
    vm.signup = function () {
      vm.credentials.userType='Candidate';
      $scope.show('Signing Up');

      $http.post(ApiUrl.url+'/api/auth/signup', vm.credentials).then(function success(response) {
        $scope.hide();
        vm.authentication.user=response.data.user;
        Authentication.storeCredentials(response.data);
        $state.go('app.tabs.tab1');
      },function error(response) {
        $scope.hide();

        var signupPopup=$ionicPopup.show({
          title: 'Signup failed',
          subTitle:response.data.message
        });

        $timeout(function() {
          signupPopup.close();
        }, 2000);
      });
    };






    vm.signin = function () {
      $scope.show('Signing In');

      $http.post(ApiUrl.url+'/api/auth/signin', vm.credentials).then(function (response) {
        $scope.hide();

        vm.authentication.user=response.data.user;
        Authentication.storeCredentials(response.data);

        $state.go('app.tabs.tab1');


      },function (response) {
        $scope.hide();

        var loginPopup=$ionicPopup.show({
          title: 'Authentication failed',
          subTitle:response.data.message
        });

        $timeout(function() {
          loginPopup.close();
        }, 2000);
      });
    };

    vm.signout=function(){
      console.log('lo');
      $http.get(ApiUrl.url+'/api/auth/signout').then(function(res){

          Authentication.removeCredentials();

          $rootScope.totalaRecommendedCount=0;
          $rootScope.totalAppliedCount= 0;

          $timeout(function () {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          },300);

          $state.go('authentication.signin');
        },
        function (res) {
          $timeout(function () {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          },300);
          Authentication.removeCredentials();

          $state.go('authentication.signin');
        });
    };



    // OAuth provider request
    vm.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href)+'&userType=User';
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };

    // OAuth provider request
    vm.callOauthProviderRecruiter = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href)+'&userType=Recruiter';
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
