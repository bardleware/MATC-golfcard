app.controller('setupCtrl', ['$scope', '$state', 'game', function ($scope, $state, game) {
  var setup = this;
  console.log(game);
  setup.courses = game.courseList;
  setup.selectedCourse;

  setup.log = function () {
  }
  setup.playerList = [
    {
      name: ""
    }
  ]

  setup.player = {
    add: function () {
      if (setup.playerList.length === 4) {
        return;
      }

      setup.playerList.push({
        name: ""
      })
      console.log("hello!")
    },

    remove: function (index) {
      setup.playerList.splice(index, 1);
    }

  }


  //this function validates that each player is unique
  function arePlayersUnique(arr) {
    var count = 0;
    var currentNode;
    for (var k = 0; k < arr.length; k++) {
      currentNode = arr[k].name;
      console.log(arr);
      for (var j = 0; j < arr.length; j++) {
        console.log(arr[j].name);
        console.log(currentNode);
        if (arr[j].name == currentNode && j !== k) {
          count++;
        }
      }
    }
    console.log(count);
    return count;
  }





  setup.startRound = function () {
    var truthCounter = 0;
    var players = [];
    var uniqueNames = [];
    var setupData = {
      selectedCourse: setup.selectedCourse,
      players: setup.playerList
    }
    setupData.players.forEach(function (obj) {
      if (obj.name) {
        truthCounter++;
      }
    });

    ;


    if (truthCounter === setup.playerList.length) {
      if (!arePlayersUnique(setup.playerList)) {
        game.getSetupData(setupData);
      } else {
        alert("Each player name should be unique");
      }
    } else {
      alert("All the player names need to be filled in");
    }
  }


}]);