angular.module('app.controllers', ['ngStorage', 'ngMask', 'ngAnimate', 'pubnub.angular.service'])
   
.controller('configuracoesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
/*.constant('config', {
        rltm: {
            service: "pubnub",
            config: {
                publishKey: "pub-c-4a53670e-fe61-4d8d-9aa0-bfe4c6be3ce2",
                subscribeKey: "sub-c-c058422c-9c89-11e7-a8ee-5e2775d0d199"
            }
        }
    })*/
.controller('chatCtrl', ['$scope', '$stateParams', 'PubNub', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, PubNub) {
    
    

}])
.controller('perfilprofissionalCtrl', ['$scope', '$stateParams','$ionicLoading', '$localStorage', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

function ($scope, $stateParams, $ionicLoading, $localStorage, $ionicPopup) {

function loading() {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
};
loading();

var usuario_id = $stateParams.usuario_id;
//var servico_id = $stateParams.servico_id;

URLAPIPROFISSIONAL = "http://localhost:8000/api/v1/auth/profissional/perfil";
    $.post(
              URLAPIPROFISSIONAL,
              {
                'usuario_id': usuario_id
                
              },
              function(response,status){
                  
                  $scope.profissional = response;
                  $scope.$apply();
                  $ionicLoading.hide();

              }).fail(function(response){

                  $ionicLoading.hide();
                  alert(":( Algo deu errado, não se preocupe vamos corrigir isso!");
                  $state.go("menu.buscaservico");
                  
    });

/*Comentarios - Lista todos para esse profissional */              
URLAPICOMENTARIOS = "http://localhost:8000/api/v1/auth/comentario/listar";
$.post(
              URLAPICOMENTARIOS,
              {
                'usuario_id': usuario_id,
                /*'servico_id': servico_id*/
              },
              function(response,status){
                  
                  $scope.comentarios = response;
                  $scope.$apply();
                  $ionicLoading.hide();

              }).fail(function(response){

                  $ionicLoading.hide();
                    $scope.comentarios = "Sem comentarios.";
                    $scope.$apply();
                  
              });


 $scope.groups = [];
  for (var i=0; i<1; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<1; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  $scope.filterNivel = function(isChecked, campoNivel){

      //console.log(isChecked + "-" + campoNivel);
      if (!isChecked) {

          $scope.campoNivel = '';
      }else{
          $scope.campoNivel = campoNivel;
      }

      

  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };


  /* FECHAR NEGOCIAÇÃO */
  $scope.fecharNegociacao = function(profissional){
    
    
     var confirmPopup = $ionicPopup.confirm({
       title: 'Fechar negócio',
       template: '1 - Toda negociação dever ser realizada pessoalmente.<br>2 - Só continue se o acordo tiver sido fechado.<br>3 - Após clicar em <strong>OK</strong> o profissional será notificado.'
     });

     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });


  }

}])
.controller('listaprofissionalCtrl', ['$scope','$state', '$stateParams','$ionicLoading', '$ionicModal', '$localStorage', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

function ($scope, $state, $stateParams, $ionicLoading, $ionicModal, $localStorage) {

function loading() {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
};

loading();

var servico = $stateParams.servico;

/* ID DO USUARIO LOGADO NO APP */
var usuario = $localStorage.tbUserdata[0].usuario_id;
/* Caminho absoluto da pasta publica */
$scope.urlbase = "http://localhost/appservicos/api/public/img/perfil/";


URLAPI = "http://localhost:8000/api/v1/auth/profissional/listar";
    $.post(
              URLAPI,
              {
                'servico': servico,
                'usuario': usuario
              },
              function(response,status){
                  
                  $scope.profissionais = response;
                  $scope.$apply();
                  $ionicLoading.hide();

              }).fail(function(response){

                  $ionicLoading.hide();
                  alert(":( Desculpe, ainda não temos alguém dessa área!");
                  $state.go("menu.buscaservico");
                  
    });

}])

.controller('buscaServicoCtrl', ['$scope', '$stateParams', '$ionicLoading',

function ($scope, $stateParams, $ionicLoading) {
 
 function loading() {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
};

loading();
  
  URLAPI1 = "http://localhost:8000/api/v1/auth/categoria/listar";
    $.post(
              URLAPI1,
              function(response,status){
                  
                  $scope.categorias = response;
                  $scope.$apply();
              }).fail(function(response){

                  console.log(response.statusText);
                   
    });

  URLAPI2 = "http://localhost:8000/api/v1/auth/servico/listar";
    $.post(
              URLAPI2,
              function(response,status){

                  $scope.servicos = response;
                  $scope.$apply();
                   $ionicLoading.hide();

              }).fail(function(response){
                  
                  alert(":( Algo deu errado! Verifique sua conexão.");
                  $scope.campoCategoria = '';
                  $scope.campoNivel = '';
                   $ionicLoading.hide();
    });

             
  
}])

.controller('categoriaProdutoCtrl', ['$scope', '$stateParams','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading) {

function loading() {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
};

loading();
 
  URLAPI = "http://silviobernardes.com.br/api_chinaImport/api/public/api/v1/auth/produto/categorias";
  $.post(
              URLAPI,
              function(response,status){
                  $scope.categorias = response;                
                  $ionicLoading.hide();
                                   
              }).fail(function(response){
                  $ionicLoading.hide();
                  console.log(response.statusText);
                  //$scope.$apply();
              });

}])

.controller('produtosCtrl', ['$scope', '$stateParams','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading) {
function loading() {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
};

loading();

  var categoryid = $stateParams.category;
  
  console.log(categoryid);
  
  URLAPI = "http://silviobernardes.com.br/api_chinaImport/api/public/api/v1/auth/produto/lista";
  $.post(
              URLAPI,
              {
                'category_id':categoryid
              },

              function(response,status){
                  $scope.produtos = response;                
                  $ionicLoading.hide();
                  //$state.go("menu.produtos");
                                   
              }).fail(function(response){
                  $ionicLoading.hide();

                  //$scope.retornoStatus(response.statusText);
                  //$scope.$apply();
              });

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$localStorage',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $localStorage) {
  
  $scope.sairApp = function(){
      delete $localStorage.tbUserdata;
      $state.go("login");
  }	

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$localStorage','$ionicLoading',
function ($scope, $stateParams,$state, $localStorage,$ionicLoading) {
     
function loading() {
      
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
};

 if ($localStorage.tbUserdata) {
        
        $state.go("menu.buscaservico");
 };

$scope.retornoStatus = function(msg){
  $scope.retornoStatus = msg;
}
  
  /* FUNÇÃO LOGAR */
  $scope.Logar = function(login){
  
  loading();
  URLAPI = "http://localhost:8000/api/v1/auth/entrar";
	var user = login.user;
  var pwd  = login.pwd;

	if (user && pwd) {
	   $.post(
              URLAPI,
              {
              	'user': user,
                'pwd': pwd,
              },

              function(response,status){
           	      
                  
                  $localStorage.tbUserdata = response;
                  $state.go("menu.buscaservico");
                  $ionicLoading.hide();
                                   
           	  }).fail(function(response){
                  
                  $scope.retornoStatus(response.statusText);
                  $scope.$apply();
                  $ionicLoading.hide();
                  
                  
              });
	}
 }

 

}]) 