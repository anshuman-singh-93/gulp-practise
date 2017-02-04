'use strict';
(function(){
  angular.module('core').factory('authInterceptor', ['$q', '$injector','Authentication',
    function ($q, $injector,Authentication) {
      return {
        'request': function(config) {
          console.log('captured');
          config.headers['x-access-token'] = Authentication.token;
          return config;
        },
        responseError: function(rejection) {
          switch (rejection.status) {
            case 401:
              Authentication.removeCredentials();
              $injector.get('$state').go('authentication.signin');
              break;
            case 403:
             // $injector.get('$state').go('forbidden');
              break;
            case 404:
              //$injector.get('$state').go('not-found', { message: 'Page not found' });
              break;
          }
          // otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    }
  ]);

})();
