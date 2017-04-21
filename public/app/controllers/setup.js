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









  setup.startRound = function () {
    var truthCounter = 0;
    var players = [];
    var setupData = {
      selectedCourse: setup.selectedCourse, 
      players: setup.playerList
    }
    setup.playerList.forEach(function (obj) {
      if (obj.name) {
        truthCounter++;
      }
    });

    if (truthCounter === setup.playerList.length) {
      game.getSetupData(setupData);


      $state.go('loading');
      

    } else {
      alert("All the player names need to be filled in");
    }
  }


}]);