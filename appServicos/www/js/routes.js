angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('menu.configuracoes', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/configuracoes.html',
        controller: 'configuracoesCtrl'
      }
    }
  }).state('menu.produtos', {
    url: '/produtos/:category',
    views: {
      'side-menu21': {
        templateUrl: 'templates/produtos.html',
        controller: 'produtosCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.buscaservico', {
    url: '/buscaservico/',
    views:{
      'side-menu21': {
          templateUrl: 'templates/buscaservico.html',  
          controller: 'buscaServicoCtrl'
      }
    }
  })

  .state('menu.categoriaProduto', {
    url:'/categoria',
    views:{
      'side-menu21':{
        templateUrl: 'templates/categoriaProduto.html',
        controller: 'categoriaProdutoCtrl'
      }
    }
  })

  .state('menu.listaprofissional', {
    url:'/profissionais/:servico',
    views:{
      'side-menu21':{
        templateUrl: 'templates/listaprofissional.html',
        controller: 'listaprofissionalCtrl'
      }
    }
  })

    
  .state('menu.perfilprofissional', {
    url:'/profissional/:usuario_id',
    views:{
      'side-menu21':{
        templateUrl: 'templates/perfilprofissional.html',
        controller: 'perfilprofissionalCtrl'
      }
    }
  })

  .state('menu.chat', {
    url:'/chat/:profissional_id',
    views:{
      'side-menu21':{
        templateUrl: 'templates/chat.html',
        controller: 'chatCtrl'
      }
    }
  })


$urlRouterProvider.otherwise('/login')

  

});