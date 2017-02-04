'use strict';

// Authentication service for user variables
angular.module('core').factory('Authentication', [
  function () {
    var auth = {
      user: undefined,
      token:undefined,
      useCredentials:useCredentials,
      storeCredentials:storeCredentials,
      removeCredentials:removeCredentials,
      updateCredentials:updateCredentials,
      isAuthenticated:false
    };

    function useCredentials(){
      if(localStorage.getItem('UserData'))
      {
        var retrievedObject = localStorage.getItem('UserData');
        var retrievedObj=JSON.parse(retrievedObject);
        auth.user=retrievedObj;
        auth.token=retrievedObj.token;
        auth.isAuthenticated=true;
      }

    }

    function updateCredentials(data){
      //this fun should be called whenever we update user model
      var storeObject = data;
      storeObject.token=auth.token;
      localStorage.setItem('UserData', JSON.stringify(storeObject));

      auth.useCredentials();

    }

    function storeCredentials(data){
      //this function should be called only when logged in
      var storeObject = data.user;
      storeObject.token=data.token;
      localStorage.setItem('UserData', JSON.stringify(storeObject));
      auth.useCredentials();



    }


    useCredentials();

    function removeCredentials(){
      if(localStorage.getItem('UserData'))
        localStorage.removeItem('UserData');
      auth.user=undefined;
      auth.token=undefined;
      auth.isAuthenticated=false;
    }


    return auth;
  }
]);
