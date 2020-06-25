angular.module('vHackersModule').controller('listaEnviosCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','listaEnviosService',function($scope, $state, $stateParams, $uibModal, NgTableParams, listaEnviosService){
    var ctrl = this;
    ctrl.envios = [];

    ctrl.tablaEnvios = new NgTableParams({}, { dataset: ctrl.alumnos });

    ctrl.agregarEnvio = function () {
      $state.go('agregarEnvio');
    }

    ctrl.init = function () {
      listaEnviosService.obtenerEnvios().then(function (envios) {
        ctrl.envios = envios;
      })
    };

    ctrl.init();

}]);
