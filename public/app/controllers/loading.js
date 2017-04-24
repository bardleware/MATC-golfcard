app.controller('mainCtrl',['$scope', 'game', function ($scope, game) {


  var buildScoreCard = 'buildScoreCard';
  if (game.state === buildScoreCard){
    game.loadGame();
  }
}]);
