app.controller('setupCtrl',['game', function ($scope, game) {
  var setup = this;
  console.log(game);

  setup.playerCount = g.playerCount;

  game.numberOfPlayers = setup.playerCount[0];


}]);