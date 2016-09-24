/**
 * Created by liuzhu on 16/9/23.
 * 电影信息控制器
 */
angular.module('myApp.controllers')
  .controller('MovieCtrl', function($scope, $ionicHistory, Movie, $location) {

    // 返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    // 数据源
    $scope.movieList = [];
    $scope.hasMoreData = false;
    // 从第1个开始取
    var start = 0;
    // 每次取10个
    var count = 10;

    var init = function () {
      getTopMovieInfo();
    };

    // 请求更多数据
    $scope.getMoreMovie = function () {
      start += count;
      getTopMovieInfo();
    };

    // 电影详情
    $scope.seeMovieDetail = function (movie) {
      $location.path('/movieDetail/'+encodeURIComponent(JSON.stringify(movie)));
    };

    // 初始化
    init();

    /**
     * 请求电影数据
     */
    function getTopMovieInfo() {
      Movie.getMovieByPage(start, count).then(
        function (data) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          if (start >= 250) {
            $scope.hasMoreData = false;
          }else {
            $scope.hasMoreData = true;
          }
          if (data && data.hasOwnProperty('subjects')) {
            $scope.movieList = $scope.movieList.concat(handleData(data.subjects));
          }
        }, function (error) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          if (start >= 250) {
            $scope.hasMoreData = false;
          }else {
            $scope.hasMoreData = true;
          }
          console.log(error);
        }
      );
    }

    /**
     * 一行2列
     * @param data 数据源
     * @returns {Array} 2维数组
     */
    function handleData(data) {
      var prepareData = [];
      for (var index = 0; index < data.length; index++) {
        var gourp = parseInt(index / 2);
        if (prepareData[gourp]) {
          prepareData[gourp].push(data[index]);
        } else {
          prepareData[gourp] = [data[index]];
        }
      }
      return prepareData;
    }



  });
