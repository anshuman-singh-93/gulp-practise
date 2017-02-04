(function () {
  'use strict';

  // Profiles controller
  angular
    .module('core')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$http','$scope','ApiUrl', '$q', '$ionicPopup', '$state', 'Authentication','$timeout','$ionicHistory'];

  function SettingsController($http,$scope,ApiUrl, $q, $ionicPopup, $state, Authentication, $timeout,$ionicHistory) {
    var vm = this;
    vm.apiUrl=ApiUrl.url;
    vm.authentication = Authentication;
    vm.passwordDetails={};
    vm.changeUserPassword = function () {

      if(vm.passwordDetails.newPassword!==vm.passwordDetails.verifyPassword)
      {
        var Popup=$ionicPopup.show({
          title: 'Change Password',
          subTitle:'Verify Password is not same'
        });

        $timeout(function() {
          Popup.close();
        }, 3000);

        return false;
      }

      $http.post(vm.apiUrl+'/api/users/password', vm.passwordDetails).then(function(res){

        vm.passwordDetails = {};
        var Popup=$ionicPopup.show({
          title: 'Change Password',
          subTitle:'Password Changed'
        });

        $timeout(function() {
          Popup.close();
        },2000);
      },function(res){
        var Popup=$ionicPopup.show({
          title: 'Change Password',
          subTitle:res.data.message
        });

        $timeout(function() {
          Popup.close();
        }, 2000);
      })
    };


  }
})();

