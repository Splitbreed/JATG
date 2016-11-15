(function(){
  angular.module('jatg', ['ui.router', 'ngFlash']).config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'main.html',
        controller: 'choreController',
        controllerAs: 'chore'
      })

      $urlRouterProvider.otherwise('/');

      // $locationProvider.html5Mode({
      //   enabled: true,
      //   requireBase: false
      // });
  }



})()
