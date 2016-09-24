/**
 * Created by liuzhu on 16/9/23.
 */
angular.module('myApp.services')
  .factory('Movie',['authHttp','$q', function (authHttp,$q) {
    return{
      getMovieByPage: function (current, count) {
        var params={start:current, count:count};
        var deferred=$q.defer();
        authHttp.post(
          'https://api.douban.com/v2/movie/top250',
          JSON.stringify(params))
          .success(function (data,status,headers,config) {
            if(data!=null && data!=undefined){
              if(data.result &&data.result.errorCode==0){
                deferred.resolve(data.result.content.data);
                return;
              }
            }
            deferred.resolve(data);
          })
          .error(function (data,status,headers,config) {
            console.log(data);
            deferred.reject(data);
          });
        return deferred.promise;
      }
    };
  }]);
