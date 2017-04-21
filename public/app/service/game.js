app.service('game', ['$http', '$state', function ($http, $state) {
  var game = this;
  var setupGame = 'setupGame';
  var loadGameData = 'loadGameData';
  game.numberOfPlayers = 1;
  game.userLocation;
  game.courseList;
  game.selectedCourse;

  game.gameData = {
    players: [],
    course: {}
  };

  game.getSetupData = function (obj) {
    game.selectedCourse = obj.selectedCourse;
    obj.players.forEach(function (player) {

      console.log(player);
      game.gameData.players.push({
        name: player.name,
        totalScore: 0, //replace with function call
        scores: [],
      })
    })
    console.log(game.gameData);
    console.log(game.selectedCourse);
    getCourseData(game.selectedCourse.id);
  }

  game.state = setupGame;
  // possible states 'loadGameData', 'setupGame'

  function updateGameState(newState) {
    game.state = newState;
  };



  console.log(game);

  if (game.state === setupGame) {
    getLocation()
      .then(function (position) {
        game.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          radius: 50
        };
        console.log(game.userLocation);
      }).then(function () {
        var req = {
          method: "POST",
          url: "https://golf-courses-api.herokuapp.com/courses",
          headers: {
            "Content-Type": "application/json"
          },
          data: game.userLocation
        };

        $http(req).then(function (response) {
          console.log(response);
          game.courseList = response.data.courses.map(function (obj, i) {
            return {
              id: obj.id,
              name: obj.name
            }
          });

          console.log(game.courseList);
        }).then(function () {
          console.log("...going to setup");
          updateGameState(loadGameData);
          console.log(game.state);
          $state.go('setup');
        });
      });
  }

  function getLocation() {
    var geolocation = navigator.geolocation;

    return new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }
      geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, () => {
        reject(new Error('Permission denied'));
      });
    });
  };

  function getCourseData(data) {
    $http({
      method: 'GET',
      url: 'http://golf-courses-api.herokuapp.com/courses/' + data
    }).then(function (resp) {
      console.log(resp);
      game.gameData.course = resp.data.course;
    }).then(function () {
      console.log(game.gameData);
      console.log(game.gameData.course);
    });
  }



}]);