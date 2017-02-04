(function(){
  angular.module('core')
    .config(function($stateProvider,$urlRouterProvider){

      $stateProvider

        .state('authentication',{
          url:'/authentication',
          abstract: true,
          templateUrl:'modules/core/templates/authentication/authentication.html',
          onEnter: function($state, Authentication) {
            if (Authentication.isAuthenticated) {
              $state.go('app.tabs.tab1');
            }
          }
        })

        .state('authentication.welcome',{
          url:'/welcome',
          templateUrl:'modules/core/templates/authentication/authentication.welcome.html'
        })


        .state('authentication.signin',{
          url:'/signin',
          templateUrl:'modules/core/templates/authentication/authentication.signin.html',
          controller:'AuthenticationController',
          controllerAs:'vm'
        })
        .state('authentication.signup',{
          url:'/signup',
          templateUrl:'modules/core/templates/authentication/authentication.signup.html',
          controller:'AuthenticationController',
          controllerAs:'vm'

        })
        .state('onBoarding',{
          url:'/onBoarding',
          abstract: true,
          templateUrl:'modules/core/templates/onBoarding/onBoarding.html'
        })

        .state('onBoarding.stage1',{
          url:'/stage1',
          templateUrl:'modules/core/templates/onBoarding/onBoarding.stage1.html'
        })


        .state('onBoarding.stage2',{
          url:'/stage2',
          templateUrl:'modules/core/templates/onBoarding/onBoarding.stage2.html',
          controller:'AuthenticationController'
        })
        .state('onBoarding.stage3',{
          url:'/stage3',
          templateUrl:'modules/core/templates/onBoarding/onBoarding.stage3.html',
          controller:'AuthenticationController'
        })
        .state('onBoarding.stage4',{
          url:'/stage4',
          templateUrl:'modules/core/templates/onBoarding/onBoarding.stage4.html',
          controller:'AuthenticationController'
        })

        .state('onBoarding.stage5',{
          url:'/stage5',
          templateUrl:'modules/core/templates/onBoarding/onBoarding.stage5.html',
          controller:'AuthenticationController'
        })
        .state('onBoarding.thankyou',{
          url:'/thankyou',
          templateUrl:'modules/core/templates/onBoarding/onBoarding.thankyou.html',
          controller:'AuthenticationController'

        })
        .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "modules/core/templates/menu.html",
     /*     controller:'AuthenticationController',
          controllerAs:'vm',
          onEnter: function($state, Authentication) {
            if (!Authentication.isAuthenticated) {
              $state.go('authentication.welcome');
            }
          }*/
        })

        .state('app.tabs', {
          url: "/tabs",
          views: {
            'menuContent': {
              templateUrl: "modules/core/templates/tabs/tabs.html"
            }
          }
        })

        .state('app.tabs.tab1', {
          url: '/tab1',
          views: {
            'tab-tab1': {
              templateUrl: 'modules/core/templates/tabs/tabs.recommended.html',
              controller:'RecommendedJobController',
              controllerAs:'vm'

            }

          }
        })

        .state('app.tabs.tab2', {
          url: '/tab2',
          views: {
            'tab-tab2': {

              templateUrl: 'modules/core/templates/tabs/tabs.applied.html',
              controller:'RecommendedJobController',
              controllerAs:'vm'

            }
          }
        })

        .state('app.tabs.tab3', {
          url: '/tab3',
          views: {
            'tab-tab3': {
              templateUrl: 'modules/core/templates/tabs/tabs.profileList.html',
              controller:'ProfilesController',
              controllerAs:'vm'
            }
          }
        })
        .state('profile', {
          url: '/profile',
          abstract: true,
          templateUrl: 'modules/core/templates/profiles/profile.html',
          controller:'ProfilesController',
          controllerAs:'vm'
        })
        .state('profile.edit', {
          url: '/profile/edit',
          templateUrl: 'modules/core/templates/profiles/profile.edit.html'
        })



      .state('invitation', {
        url: '/invitation',
        abstract: true,
        templateUrl: "modules/core/templates/invitations/invitation.html"
        })
      .state('invitation.list', {
        url: '/list',

        templateUrl: 'modules/core/templates/invitations/invitation.list.html',
        controller:'InvitationController',
        controllerAs:'vm'
      })
      .state('invitation.create', {
        url: '/create',

        templateUrl: 'modules/core/templates/invitations/invitation.create.html',
        controller:'InvitationCreateController',
        controllerAs:'vm'
      })

      .state('settings', {
        url: '/settings',
        abstract: true,
        templateUrl: "modules/core/templates/settings/settings.html"
      })
        .state('settings.main', {
          url: '/main',
          templateUrl: 'modules/core/templates/settings/settings.main.html'
        })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/core/templates/settings/settings.password.html',
        controller:'SettingsController',
        controllerAs:'vm'
      })
      .state('settings.aboutUs', {
        url: '/aboutUs',
        templateUrl: 'modules/core/templates/settings/settings.aboutUs.html'

      })

      .state('settings.terms', {
        url: '/terms',
        templateUrl: 'modules/core/templates/settings/settings.terms.html'

      })

    .state('settings.policy', {
        url: '/policy',
        templateUrl: 'modules/core/templates/settings/settings.policy.html'

      })

    .state('settings.faq', {
      url: '/faq',
      templateUrl: 'modules/core/templates/settings/settings.faq.html'

    })

    .state('jobView', {
      url: '/jobView',
      templateUrl: 'modules/core/templates/jobs/job.view.html',
      controller:'JobViewController',
      controllerAs:'vm',
      params:{job:null}

    });

    });


})();
