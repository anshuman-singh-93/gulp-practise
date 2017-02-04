//Invitations service used to communicate Invitations REST endpoints
(function () {
  'use strict';

  angular
    .module('core')
    .factory('ApiUrl', ApiUrl);


  function ApiUrl() {

    return {url: 'http://quest.careers'};
  }
})();
