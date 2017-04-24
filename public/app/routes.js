app.config(function ($stateProvider, $locationProvider,$urlRouterProvider) {

    //function to create route 'table'
    function createState(item) {
      $stateProvider.state(item.state, {
        abstract: item.abstract,
        parent: item.parent,
        url: item.url,
        templateUrl: item.tmpUrl,
        template: item.template,
        controller: item.ctrl,
        views: item.views,
        requiredRole: item.requiredRole,
        resolve: item.resolve,
        controllerAs: item.controllerAs,
        index: item.index
      });
    }

    createState({
      state: 'loading',
      url: '/',
      tmpUrl: 'app/views/pages/loading.html',
      ctrl: 'mainCtrl',
      controllerAs: 'main'
    });

    createState({
      state: 'setup',
      url: '/setup',
      tmpUrl: 'app/views/pages/setup.html',
      ctrl: 'setupCtrl',
      controllerAs: 'setup'
    });

    createState({
      state: 'game',
      url: '/game',
      tmpUrl: 'app/views/pages/game.html',
      //need a controller
    });
    createState({
      state: 'game.scorecard',
      url: '/scorecard',
      tmpUrl: 'app/views/pages/game/scorecard.html',
      ctrl: 'scorecard',
      controllerAs: 'card'
    });
    createState({
      state: 'game.map',
      url: '/map',
      tmpUrl: 'app/views/pages/game/map.html',
      ctrl: 'mapCtrl',
      controllerAs: 'map'
      //needa a controller
    });
    createState({
      state: 'game.scoreboard',
      url: '/scoreboard',
      tmpUrl: 'app/views/pages/game/score.html',
      ctrl: 'scoreboard',
      controllerAs: 'score'
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');
  });
