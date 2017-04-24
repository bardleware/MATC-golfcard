app.controller('scorecard',['$scope', 'game', '$state', function($scope, game, $state){
  var card = this;
  card.titleCol = game.gameData.titleCol;
  card.scorecard = game.gameData.scorecard;

  card.updateScore = function(i, val, num){
    game.updateScore(i, val, num);
  }

  card.seeScoreboard = function(){
    $state.go('game.scoreboard');
  }

}]);