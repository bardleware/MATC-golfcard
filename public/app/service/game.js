app.service('game', ['$http', '$state', function ($http, $state) {
  var game = this;
  var setupGame = 'setupGame';
  var loadGameData = 'loadGameData';
  var buildScoreCard = 'buildScoreCard';
  game.numberOfPlayers = 1;
  game.userLocation;
  game.courseList;
  game.selectedCourse;
  game.orderedPlayers;

  game.gameData = {
    players: [],
    course: {},
    scorecard: [],
    titleCol: []
  };

  game.getSetupData = function (obj) {
    game.selectedCourse = obj.selectedCourse;
    obj.players.forEach(function (player) {

      game.gameData.players.push({
        name: player.name,
        totalScore: 0, //replace with function call
        scores: [],
      })
    })
    console.log(game.gameData);
    console.log(game.selectedCourse);
    updateGameState(buildScoreCard);
    $state.go('loading');
    console.log(game.state);
  }

  game.state = setupGame;
  // possible states 'loadGameData', 'setupGame'

  function updateGameState(newState) {
    game.state = newState;
  };

  game.updateScore = function (i, val, hole) {
    game.gameData.players[i].scores[hole] = parseInt(val, 10);

    game.gameData.players[i].totalScore = game.gameData.players[i].scores.reduce(function (acc, curr) {
      return acc + curr;
    }, 0);

    //orderPlayersByScore();
    console.log(game.gameData.players);
    console.log(game.gameData.players[i].totalScore);
    console.log(game.gameData.players[i].name);
  }

  function orderPlayersByScore() {
    game.orderedPlayers = game.gameData.players;

    game.orderedPlayers.sort(function(a,b){
      return a.totalScore - b.totalScore;
    })
  }

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

  game.loadGame = function () {
    var data = game.selectedCourse.id;

    $http({
      method: 'GET',
      url: 'http://golf-courses-api.herokuapp.com/courses/' + data
    }).then(function (resp) {
      console.log(resp);
      game.gameData.course = resp.data.course;

      var course = game.gameData.course;
      var players = game.gameData.players;

      console.log("inside createScorecard");


      //this block creates the label column on the left side of the score card.
      game.gameData.titleCol.push({ label: "Hole" }); //creates the Hole label
      course.holes[0].tee_boxes.forEach(function (obj) {
        console.log(obj.tee_type.toUpperCase());
        if (obj.tee_type !== 'auto change location') {
          game.gameData.titleCol.push({ label: obj.tee_type.toUpperCase() });
        }
      });//creates the tee type row label
      game.gameData.titleCol.push({ label: "Handicap" }); //Creates Handicap Label
      game.gameData.titleCol.push({ label: "Par" }); // Creates Par Label
      players.forEach(function (obj) {
        game.gameData.titleCol.push({ label: obj.name }); //creates Player labels
      })
      console.log(game.titleCol);


      function createScorecard(i) {
        var arrRow = [];
        var scoreArr = [];
        arrRow.push(
          {
            num: game.gameData.course.holes[i].hole_num,
            greenLoc: game.gameData.course.holes[i].green_location
          });

        game.gameData.course.holes[i].tee_boxes.forEach(function (obj, index) {
          if (obj.tee_type !== 'auto change location') {
            var rowData = {
              teeType: obj.tee_type,
              num: obj.yards,
              teeColor: obj.tee_hex_color,
              loacation: obj.location
            }
            arrRow.push(rowData);
          }
        });

        arrRow.push(
          {
            num: game.gameData.course.holes[i].tee_boxes[0].hcp
          });

        arrRow.push(
          {
            num: game.gameData.course.holes[i].tee_boxes[0].par
          });

        game.gameData.players.forEach(function (obj, index) {
          scoreArr.push({
            hole: i,
            index: index,
            score: 0
          });
          
          game.gameData.players[index].scores.push(0)
        })

        return {
          arrRow: arrRow,
          scoreArr: scoreArr
        };
      };
      for (var i = 0; i < game.gameData.course.holes.length; i++) {
        game.gameData.scorecard.push(createScorecard(i));
        console.log(game.gameData.scorecard)
      }
    })
    console.log(game.gameData.players);
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





}]);