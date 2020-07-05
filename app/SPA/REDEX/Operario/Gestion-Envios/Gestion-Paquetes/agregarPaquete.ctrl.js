angular.module('vHackersModule').controller('agregarPaqueteCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','agregarPaqueteService',function($scope, $state, $stateParams, $uibModal, NgTableParams, agregarPaqueteService){

    var ctrl = this;

    ctrl.listaPaquetes = [];
    ctrl.descripcionPaquete = '';
    ctrl.nuevoId = 1;
    ctrl.idEncomienda = 1;

    ctrl.tablaPaquetes = new NgTableParams({}, { dataset: ctrl.listaPaquetes });

    ctrl.agregarPaquete = function () {
      var paqueteNuevo = {
        //id: ctrl.nuevoId,
        idEncomienda: ctrl.idEncomienda,
        descripcion: ctrl.descripcionPaquete
      };

      //ctrl.nuevoId += 1;

      // ctrl.listaPaquetes.push(paqueteNuevo);
      //
      // ctrl.descripcionPaquete = '';

      //$scope.$apply();
      agregarPaqueteService.registrarPaqueteEnvio(paqueteNuevo).then(function (respuestaPaquetesEnvio) {
        console.log(respuestaPaquetesEnvio.id);
        ctrl.listaPaquetes.push(paqueteNuevo);

        ctrl.descripcionPaquete = '';
      });

    };

    ctrl.eliminarPaquete = function (paqueteEliminado, indicePaqueteTabla) {
      ctrl.listaPaquetes.splice(indicePaqueteTabla, 1);
    };

    ctrl.registrarPaquetes = function () {

      $state.go('listaEnvios');

      // var paquetesEnvio = {
      //   "listaPaquetes": ctrl.listaPaquetes
      // };
      //
      // agregarPaqueteService.registrarPaquetesEnvio(paquetesEnvio).then(function (respuestaPaquetesEnvio) {
      //   console.log(respuestaPaquetesEnvio.id);
      //   $state.go('agregarRutas');
      // });
    };

    ctrl.init = function () {
      var datosEncomienda = {
        "emisor": $stateParams.idEmisor,
        "receptor": $stateParams.idReceptor,
        "operario": $stateParams.idOperario
      };
      agregarPaqueteService.obtenerEncomienda(datosEncomienda).then(function (envios) {
        ctrl.envios = envios;
        console.log(envios);
        ctrl.idEncomienda = ctrl.envios[0].idEncomienda;
      });
    };

    ctrl.init();

}]);
