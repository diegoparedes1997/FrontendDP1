angular.module('vHackersModule').controller('mapaSimulacionCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','mapaSimulacionService',function($scope, $state, $stateParams, $uibModal, NgTableParams, mapaSimulacionService){
    var ctrl = this;
    ctrl.idSimulacion = $stateParams.idSimulacion
    ctrl.numeroDiasSimulacion = 0;
    ctrl.simulacionRealizada = false;

    ctrl.regresar = function () {
      $state.go('inicioSimulacion');
    };

    ctrl.init = function () {
      console.log(ctrl.idSimulacion);
      mapaSimulacionService.obtenerSimulacion(ctrl.idSimulacion).then(function (simulacion) {
        console.log(simulacion);
      });
    };

    ctrl.init();

}]);
