(function () {
  'use strict';

  // Profiles controller
  angular
    .module('core')
    .controller('InvitationCreateController', InvitationCreateController);

  InvitationCreateController.$inject = ['$http','$scope','ApiUrl', '$q', '$ionicPopup', '$state', 'Authentication','$timeout'];

  function InvitationCreateController($http,$scope,ApiUrl, $q, $ionicPopup, $state, Authentication, $timeout) {
    var vm = this;
    vm.apiUrl=ApiUrl.url;
    vm.authentication = Authentication;

    vm.invitation={};
    vm.save=function(){

      if (vm.invitation.invitee.length!==0) {
        for (var i = 1; i <= vm.invitation.invitee.length; i++) {
          if (angular.isObject(vm.invitation.invitee[i])) {
            if (vm.invitation.invitee[i].name === '' && vm.invitation.invitee[i].email === '') {
              vm.invitation.invitee.splice(i, 1);
            } else {
              NotificationService.success('Your email has been sent');
            }
          } else {
            vm.invitation.invitee.splice(i, 1);
          }
        }

        $http.post(vm.apiUrl+'/api/invitations',vm.invitation).then(function success(res){

          var Popup=$ionicPopup.show({
            title: 'Refer a Friend',
            subTitle:'Invitation Sent'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);

          console.log(res);
        },function error(res){

          var Popup=$ionicPopup.show({
            title: 'Refer a Friend',
            subTitle:res.data.message
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
        });
      }
    }


  }
})();

