/**
 * Created by liuzhu on 16/9/23.
 */
angular.module('myApp.services')
  .factory('authHttp', function ($http,$q,$timeout) {
    var authHttp={};

    var extendHeaders= function (config) {
      config.timeout = 25000;
      config.headers=config.headers||{};
    };

    angular.forEach(['get','delete','head','jsonp'], function (name) {
      authHttp[name]= function (url, config) {
        config=config||{};

        extendHeaders(config);
        return $http[name](url,config);
      };
    });

    angular.forEach(['post','put'], function (name) {
      authHttp[name]= function (url, data, config) {
        config=config|| {"Content-Type": "application/json"};

        var headers={headers:config};
        extendHeaders(headers);
        return $http[name](url,data,headers);
      }
    });

    return authHttp;
  });
