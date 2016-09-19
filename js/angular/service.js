/**
 * Created by sinukoll on 6/1/15.
 * services
 */
(function(angular){
    'use strict';
    /* Configuration for intercepting the http calls */
    function customconfig($httpProvider){  };

    function getData($http){
      var getSteInfo = {};
        getSteInfo.getAPIData = function(formdata){
                                    return $http({
                                                            url:'getData.php',
                                                            data : formdata,
                                                            method : 'post',
                                                            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                                                        })
                                                .then(function(returnedData){

                                                  
                                                          return returnedData.data;
                                                      }).catch(function(response){});
                              };

                              return getSteInfo;
    };

    angular
        .module('hari_app')
        .config(['$httpProvider',customconfig])
        .factory('getData',['$http',getData])
})(window.angular);
