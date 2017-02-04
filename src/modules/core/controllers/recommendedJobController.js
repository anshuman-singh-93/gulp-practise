/**
 * Created by admin on 11/29/2016.
 */
(function(){

  angular.module('core').controller('RecommendedJobController',RecommendedJobController);

  RecommendedJobController.$inject=['$http','Authentication','ApiUrl','$q','$state','$ionicPopup','$timeout','$rootScope','$scope'];
  function RecommendedJobController($http,Authentication,ApiUrl,$q,$state,$ionicPopup,$timeout,$rootScope , $scope){

    var vm=this;
    vm.apiUrl=ApiUrl.url;
    vm.authentication=Authentication;
    vm.isPrimaryProfileExist=false;
    vm.totalAppliedJobs=[];
    vm.totalRecommendedJobs=[];
    vm.pullfromRefresh=false;
    $rootScope.totalRecommendedCount= $rootScope.totalRecommendedCount||0;
    $rootScope.totalAppliedCount= $rootScope.totalAppliedCount|| 0;
    vm.init=init;
    $scope.refresh=refresh;

    vm.init();
    function init(){

      vm.candidateProfileStatDeffered=checkcandidatePrimaryProfile();
      vm.deferred=getRecommendedjobForCandidate();
      vm.candidateProfileStatDeffered.then(function(res){
        vm.candidatePrimaryProfile=res.data;

      },function(res){
      });

      vm.deferred.then(function success(res){
        vm.isPrimaryProfileExist=true;

        var recjob=[];
        var appliedjob=[];
        res.data.forEach(function(job){
          if(job.jobApplicationStatus.isApplied===false)
          {
            recjob.push(job);

          }
          else if(job.jobApplicationStatus.isApplied===true)
          {
            appliedjob.push(job);

          }

        });

        vm.totalRecommendedJobs=recjob;
        vm.totalAppliedJobs=appliedjob;
        $rootScope.totalRecommendedCount=vm.totalRecommendedJobs.length;
        $rootScope.totalAppliedCount=vm.totalAppliedJobs.length;

        console.log(vm.totalRecommendedJobs);
      },function error(res){
        if(res.data.message==='No primary profile exist')
        {
          vm.isPrimaryProfileExist=false;
        }
        else
        {
          var Popup=$ionicPopup.show({
            title: 'Information',
            subTitle:res.data.message
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
        }

      });

      if(vm.pullfromRefresh)
      {
        $q.all([vm.candidateProfileStatDeffered, vm.deferred]).then(function(data){
          console.log('all ') ;
          $scope.$broadcast('scroll.refreshComplete');

        },function(){
          $scope.$broadcast('scroll.refreshComplete');

        });
      }
    }


    function refresh(){
      console.log('pulling start');

      vm.pullfromRefresh=true;
      vm.init();

    }



    vm.jobView=function(job){

      $state.go('jobView',{job:job});
    };

    function checkcandidatePrimaryProfile() {
      return $http.get(vm.apiUrl + '/getCandidatePrimaryProfileStat');
    }

    function getRecommendedjobForCandidate() {
     return $http.get(ApiUrl.url+'/api/recommendations');
    }
  }


})();

