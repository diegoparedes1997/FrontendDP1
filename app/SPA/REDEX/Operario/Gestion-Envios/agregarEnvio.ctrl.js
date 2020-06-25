angular.module('vHackersModule').controller('agregarEnviosCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','agregarEnviosService',function($scope, $state, $stateParams, $uibModal, NgTableParams, agregarEnviosService){
    var ctrl = this;

    ctrl.regresarListarEnvios = function () {
      $state.go('listaEnvios');
    }

    ctrl.init = function () {
      // agregarEnviosService.obtenerEnvios().then(function (envios) {
      //   ctrl.envios = envios;
      // })
    };

    ctrl.init();

}]);
