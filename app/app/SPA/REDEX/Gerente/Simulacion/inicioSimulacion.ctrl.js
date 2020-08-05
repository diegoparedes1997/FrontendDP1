angular.module('vHackersModule').controller('inicioSimulacionCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','inicioSimulacionService',function($scope, $state, $stateParams, $uibModal, NgTableParams, inicioSimulacionService){
    var ctrl = this;
    ctrl.idUsuario = $scope.$parent.$parent.rCtrl.idUsuario
    ctrl.numeroDiasSimulacion = 0;
    ctrl.simulacionRealizada = false;
    ctrl.idSimulacionGenerada = 0;

    ctrl.agregarEnvio = function () {
      $state.go('agregarEnvio');
    };

    ctrl.realizarSimulacion = function () {
      console.log(ctrl.numeroDiasSimulacion);
      inicioSimulacionService.realizarSimulacion(ctrl.numeroDiasSimulacion).then(function (respuestaSimulacion) {
        console.log(respuestaSimulacion);
        ctrl.idSimulacionGenerada = respuestaSimulacion.idSimulacion;
        ctrl.simulacionRealizada = true;
      });
    };

    ctrl.visualizarSimulacionGrafica = function () {
      console.log('Hacia simulacion');
      $state.go('mapaSimulacion', {idSimulacion: ctrl.idSimulacionGenerada});
    };

    ctrl.regresar = function () {
      $state.go('listaEnvios');
    };

    ctrl.init = function () {
      console.log(ctrl.idUsuario);
    };

    ctrl.init();

}]);
