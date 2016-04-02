angular.module('lyric', ['util'])
.controller('lyricCtrl', function($scope, $data, $timeout){

  $scope.alertCorrection = function(acert){
    $scope.alertAcert.acert = acert;
    $scope.alertAcert.open = true;
    $timeout(function(){$scope.alertAcert.open = false}, 1000);
  }

  $scope.doSearch = function(userWrite) {
    if(userWrite !== ''){
      $data.post('search', angular.toJson({text: userWrite})).then(function(data){
        $scope.search.retornoSearch = data;
        $scope.search.open = true;
      });
    } else {
      $scope.search.retornoSearch = [];
      $scope.search.open = false;
    }
  }

  $scope.writeWord = function(id){
    var obj = $scope.music.words[id];
    if(obj.writed!== undefined && obj.writed !== ''){
      if(obj.word.toLowerCase() == obj.writed.toLowerCase()){
        obj.correct = true;
        $scope.alertCorrection(true);
      } else {
        obj.correct = false;
        $scope.alertCorrection(false);
      }
    }
  };

  $scope.openLyric = function(item, percent){
    $scope.choicedMusic = item;

    if($scope.choicedMusic.album_coverart_800x800 !== ""){
      $scope.choicedMusic.album_coverart = $scope.choicedMusic.album_coverart_800x800;
    } else if($scope.choicedMusic.album_coverart_500x500 !== ""){
      $scope.choicedMusic.album_coverart = $scope.choicedMusic.album_coverart_500x500;
    } else if($scope.choicedMusic.album_coverart_350x350 !== ""){
      $scope.choicedMusic.album_coverart = $scope.choicedMusic.album_coverart_350x350;
    } else if($scope.choicedMusic.album_coverart_100x100 !== ""){
      $scope.choicedMusic.album_coverart = $scope.choicedMusic.album_coverart_100x100;
    }

    $data.post('getLyric', angular.toJson({id: item.track_id, percent: 10})).then(function(data){
      $scope.music = data;

      var myReturn = $scope.music.replaceableLyric;
      angular.forEach($scope.music.words, function(value, key){
        myReturn = myReturn.replace("$"+value.random+"$", '<input type="text" maxlength="'+value.word.length+'" minlength="'+value.word.length+'" size="'+value.word.length+'" ng-model="music.words['+key+'].writed" ng-keyup="writeWord('+key+')" ng-class="{\'valid\': music.words['+key+'].correct == true}" />');
      });

      myReturn = myReturn.replace(new RegExp(/\r?\n/g), '<br />');

      $scope.music.replaceableLyric = myReturn;

    });
  }


});
