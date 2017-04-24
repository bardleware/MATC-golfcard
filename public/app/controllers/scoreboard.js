app.controller('scoreboard',['$scope', 'game', '$state', function($scope, game, $state){
  var score = this;
  scores.orderedPlayers = game.gameData.players.map(function(obj){
    return{
      name: obj.name,
      score: obj.totalScore
    }
  })
  scores.seeScorecard = function(){
    $state.go('game.scorecard');
  }

}]);