angular.module('vHackersModule').controller('listaEnviosCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','listaEnviosService',function($scope, $state, $stateParams, $uibModal, NgTableParams, listaEnviosService){
    var ctrl = this;
    ctrl.idUsuario = $scope.$parent.$parent.rCtrl.idUsuario
    ctrl.envios = [];

    ctrl.tablaEnvios = new NgTableParams({}, { dataset: ctrl.alumnos });

    ctrl.agregarEnvio = function () {
      $state.go('agregarEnvio');
    };

    ctrl.irSimulacion = function () {
      $state.go('inicioSimulacion');
    };

    ctrl.init = function () {
      console.log(ctrl.idUsuario);
      listaEnviosService.obtenerEnvios().then(function (envios) {
        console.log(envios);
        ctrl.envios = envios;
      })
    };

    ctrl.init();

}]);
