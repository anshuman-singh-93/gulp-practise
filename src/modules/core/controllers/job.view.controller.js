(function () {
  'use strict';

  // Profiles controller
  angular
    .module('core')
    .controller('JobViewController', JobViewController);

  JobViewController.$inject = ['$http','$rootScope','ApiUrl', '$q', '$ionicPopup', '$state', 'Authentication','$stateParams','$timeout'];

  function JobViewController($http,$rootScope,ApiUrl, $q, $ionicPopup, $state, Authentication,$stateParams,$timeout ) {
    var vm = this;
    vm.apiUrl=ApiUrl.url;
    vm.authentication = Authentication;
    vm.job=$stateParams.job;
    vm.apply=apply;
    vm.hasApplied=false;


    function apply(job) {
      var data = ({ jobId: vm.job._id });

      $http.post(vm.apiUrl+'/apply-form', data).then(function (response) {

        $rootScope.totalaRecommendedCount--;
        $rootScope.totalAppliedCount++;

        vm.hasApplied=true;
        var Popup=$ionicPopup.show({
          title: 'Apply for a Job',
          subTitle:'You have Applied'
        });

        $timeout(function() {
          Popup.close();
        }, 2000);


      }, function error(response) {
        var Popup=$ionicPopup.show({
          title: 'Apply for a Job',
          subTitle:response.data.message
        });

        $timeout(function() {
          Popup.close();
        }, 2000);
      });
    }


  }
})();

