app.factory('game', function () {
  var game = {};
  game.numberOfPlayers = 1;

  game.playerCount = [{
    id: 1,
    num:"1"
  },
  {
    id: 2,
    num:"2"
  },
  {
    id: 3,
    num:"3"
  },
  {
    id: 4,
    num:"4"
  }];


  console.log(game);
  return game;

});