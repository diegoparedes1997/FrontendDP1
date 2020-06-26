angular.module('vHackersModule').controller('modalListaClientesCtrl', modalListaClientesCtrl);

modalListaClientesCtrl.$inject = ['$scope', '$uibModalInstance', 'NgTableParams', 'listaClientesService', 'parametrosModalClientes'];

function modalListaClientesCtrl ($scope, $uibModalInstance, NgTableParams, listaClientesService, parametrosModalClientes){

  var ctrl = this;

  ctrl.listaClientes = [];

  ctrl.tablaClientes = new NgTableParams({}, { dataset: ctrl.alumnos });

  ctrl.seleccionarCliente = function (clienteSeleccionado) {
    $uibModalInstance.close(clienteSeleccionado);
  };

  ctrl.init = function () {
    listaClientesService.obtenerClientes().then(function (clientes) {
      ctrl.listaClientes = clientes;
    })
  };

  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };

  ctrl.init();
};
