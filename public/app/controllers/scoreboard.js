app.controller('scoreboard',['$scope', 'game', '$state', function($scope, game, $state){
  var score = this;
  score.orderedPlayers = game.gameData.players.map(function(obj){
    return{
      name: obj.name,
      score: game.gameData.coursePar - obj.totalScore
    }
  })
  score.seeScorecard = function(){
    $state.go('game.scorecard');
  }

}]);