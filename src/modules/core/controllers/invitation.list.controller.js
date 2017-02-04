(function () {
  'use strict';

  // Profiles controller
  angular
    .module('core')
    .controller('InvitationController', InvitationController);

  InvitationController.$inject = ['$http','$scope','ApiUrl', '$q', '$ionicPopup', '$state', 'Authentication','$timeout','$ionicHistory'];

  function InvitationController($http,$scope,ApiUrl, $q, $ionicPopup, $state, Authentication, $timeout,$ionicHistory) {
    var vm = this;
    vm.apiUrl=ApiUrl.url;
    vm.authentication = Authentication;
    vm.invitations=getInvitation;
    $scope.refresh=refresh;
    vm.pullfromRefresh=false;

    vm.invitations();

    function refresh(){
      vm.pullfromRefresh=true;

      getInvitation();
    }




    vm.resend=function(invitation,index){

      vm.deffered2= $q.defer();
      $http.put(vm.apiUrl+'/api/invitations/'+invitation._id,invitation).then(function(res){

        vm.deffered2.resolve(res.data);
        var Popup=$ionicPopup.show({
          title: 'Refer a Friend',
          subTitle:'Invitation ReSent'
        });

        $timeout(function() {
          Popup.close();
        }, 2000);
      },function (res){

        console.log(res.data.message);
        vm.deffered2.reject(res.data.message);

        var Popup=$ionicPopup.show({
          title: 'Refer a Friend',
          subTitle:res.data.message
        });

        $timeout(function() {
          Popup.close();
        }, 2000);
      });
    };

    function getInvitation(){

      vm.deffered= $q.defer();
      $http.get(vm.apiUrl+'/api/invitations').then(function(res){

        vm.deffered.resolve(res.data);
        vm.invitations=res.data;
        $scope.$broadcast('scroll.refreshComplete');

      },function (res){
        $scope.$broadcast('scroll.refreshComplete');

        vm.deffered.reject(res.data.message);

      });

    }

  }
})();

