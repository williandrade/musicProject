var app = angular.module('musicApp', ['ngAnimate', 'util', 'ngRoute','ui.bootstrap', 'angular-parallax', 'lyric', 'principal']);

app.config(function($routeProvider){

  $routeProvider
  .when('/lyric', {
    templateUrl: 'app/lyric/lyric.tpl.html',
    controller: 'lyricCtrl'
  })
  .when('/', {
    templateUrl: 'app/principal/principal.tpl.html',
    controller: 'principalCtrl'
  })

});


app.controller('musicAppCtrl', function($scope, $timeout){
  $scope.menuClose = true;
  $scope.alertAcert = {
    acert: false,
    open: false
  };

  $scope.search = {
    userWrite: '',
    retornoSearch: [],
    open: false
  };

  $scope.music = {
    lyric: {},
    replaceableLyric: '',
    words: [],
    percent: 0
  };


});
