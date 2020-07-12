angular.module('vHackersModule').controller('agregarRutasCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','agregarRutasService',function($scope, $state, $stateParams, $uibModal, NgTableParams, agregarRutasService){

    var ctrl = this;

    ctrl.listaPaquetes = [];
    ctrl.listaRutas = [];

    ctrl.tablaPaquetes = new NgTableParams({}, { dataset: ctrl.listaPaquetes });
    ctrl.tablaRutas = new NgTableParams({}, { dataset: ctrl.listaRutas });

    ctrl.calcularRutasEnvio = function () {
      agregarRutasService.calcularRutasEnvio(ctrl.listaPaquetes).then(function (rutas) {
        ctrl.listaRutas = rutas;
      });
    };

    ctrl.registrarRutasEnvio = function () {
      var rutasEnvio = {
        "listarutas": ctrl.listaPaquetes
      };

      agregarRutasService.registrarRutasEnvio(rutasEnvio).then(function (respuestaRutasEnvio) {
        console.log(respuestaRutasEnvio.id);
        $state.go('listaEnvios');
      });
    };

    ctrl.init = function () {
      agregarRutasService.obtenerPaquetes().then(function (paquetes) {
        ctrl.listaPaquetes = paquetes;
      });
    };

    ctrl.init();

}]);
