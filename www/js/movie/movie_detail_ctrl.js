/**
 * Created by liuzhu on 16/9/23.
 */
angular.module('myApp.controllers')
  .controller('MovieDetailCtrl', function ($scope, $stateParams, $location, $ionicHistory) {

    // 返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    if ($stateParams && $stateParams.movieDetail) {
      $scope.movie = JSON.parse(decodeURIComponent($stateParams.movieDetail));
    }

    // 查看演员/导演详情
    $scope.showPeopleDetail = function (people) {
      $scope.people = people;
      $location.path('/peopleDetail');
    };

  });
