angular.module('appRoutes', ['ui.router'])
  .config(function ($stateProvider, $locationProvider,$urlRouterProvider) {

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
      tmpUrl: 'app/views/pages/loading.html'
    });

    createState({
      state: 'setup',
      url: '/setup',
      tmpUrl: 'app/views/pages/setup.html'
    });

    createState({
      state: 'game',
      url: '/game',
      tmpUrl: 'app/views/pages/game.html',
      ctrl: 'regCtrl',
      controllerAs: 'reg'
    });
    createState({
      state: 'game.scorecard',
      url: '/scorecard',
      tmpUrl: 'app/views/pages/game/scorecard.html',
      //needa a controller
    });
    createState({
      state: 'game.map',
      url: '/map',
      tmpUrl: 'app/views/pages/game/map.html',
      //needa a controller
    });
    createState({
      state: 'game.scoreboard',
      url: '/scoreboard',
      tmpUrl: 'app/views/pages/game/score.html',
      //needa a controller
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');
  });
