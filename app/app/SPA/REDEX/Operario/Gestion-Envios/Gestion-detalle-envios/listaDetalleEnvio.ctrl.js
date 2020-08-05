angular.module('vHackersModule').controller('modalListaDetalleEnvioCtrl', modalListaDetalleEnvioCtrl);

modalListaDetalleEnvioCtrl.$inject = ['$scope', '$uibModalInstance', 'NgTableParams', 'listaDetalleEnvioService', 'parametrosDetalleEnvio'];

function modalListaDetalleEnvioCtrl ($scope, $uibModalInstance, NgTableParams, listaDetalleEnvioService, parametrosDetalleEnvio){

  var ctrl = this;

  ctrl.listaPaquetes = [];

  ctrl.idEnvio = parametrosDetalleEnvio.idEnvio;

  ctrl.tablaPaquetes = new NgTableParams({}, { dataset: ctrl.listaPaquetes });

  ctrl.seleccionarCliente = function (clienteSeleccionado) {
    $uibModalInstance.close(clienteSeleccionado);
  };

  ctrl.init = function () {
    listaDetalleEnvioService.obtenerDetalleEnvio(ctrl.idEnvio).then(function (paquetes) {
      ctrl.listaPaquetes = paquetes;
    })
  };

  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };

  ctrl.init();
};
