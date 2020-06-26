angular.module('vHackersModule').controller('agregarPaqueteCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','agregarPaqueteService',function($scope, $state, $stateParams, $uibModal, NgTableParams, agregarPaqueteService){

    var ctrl = this;

    ctrl.listaPaquetes = [];
    ctrl.descripcionPaquete = '';
    ctrl.nuevoId = 1;

    ctrl.tablaPaquetes = new NgTableParams({}, { dataset: ctrl.listaPaquetes });

    ctrl.agregarPaquete = function () {
      var paqueteNuevo = {
        id: ctrl.nuevoId,
        descripcion: ctrl.descripcionPaquete
      };

      ctrl.nuevoId += 1;

      ctrl.listaPaquetes.push(paqueteNuevo);

      ctrl.descripcionPaquete = '';

      //$scope.$apply();
    };

    ctrl.eliminarPaquete = function (paqueteEliminado, indicePaqueteTabla) {
      ctrl.listaPaquetes.splice(indicePaqueteTabla, 1);
    };

    ctrl.registrarPaquetes = function () {
      var paquetesEnvio = {
        "listaPaquetes": ctrl.listaPaquetes
      };

      agregarPaqueteService.registrarPaquetesEnvio(paquetesEnvio).then(function (respuestaPaquetesEnvio) {
        console.log(respuestaPaquetesEnvio.id);
        $state.go('agregarRutas');
      });
    };

    ctrl.init = function () {
      // listaEnviosService.obtenerEnvios().then(function (envios) {
      //   ctrl.envios = envios;
      // });
    };

    ctrl.init();

}]);
