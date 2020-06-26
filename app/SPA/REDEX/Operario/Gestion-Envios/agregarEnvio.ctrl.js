angular.module('vHackersModule').controller('agregarEnviosCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','agregarEnviosService',function($scope, $state, $stateParams, $uibModal, NgTableParams, agregarEnviosService){

    var ctrl = this;

    ctrl.registroValido = false;

    ctrl.clienteEmisor = {};

    ctrl.clienteReceptor = {};

    ctrl.origenesLista = [];

    ctrl.destinosLista = [];

    ctrl.regresarListarEnvios = function () {
      $state.go('listaEnvios');
    };

    ctrl.seleccionarEmisor = function () {
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'SPA/REDEX/Operario/Gestion-Envios/Gestion-Clientes/listaClientes.html',
        controller: 'modalListaClientesCtrl as ctrl',
        size: 'lg',
        backdrop: true,
        keyboard: true,
        resolve: {
          parametrosModalClientes: function () {
            return {
              tipoCliente: 'EMISOR'
            };
          }
        }
      });

      //Recibo parametro de retorno
      modalInstance.result.then( function (parametroRetorno) {
        if (parametroRetorno) {
          ctrl.clienteEmisor = parametroRetorno;
        }
      });
    };

    ctrl.seleccionarReceptor = function () {
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'SPA/REDEX/Operario/Gestion-Envios/Gestion-Clientes/listaClientes.html',
        controller: 'modalListaClientesCtrl as ctrl',
        size: 'lg',
        backdrop: true,
        keyboard: true,
        resolve: {
          parametrosModalClientes: function () {
            return {
              tipoCliente: 'RECEPTOR'
            };
          }
        }
      });

      //Recibo parametro de retorno
      modalInstance.result.then( function (parametroRetorno) {
        if (parametroRetorno) {
          ctrl.clienteReceptor = parametroRetorno;
        }
      });
    };

    ctrl.validarClientes = function () {
      ctrl.registroValido = (ctrl.destino && ctrl.origen && ctrl.clienteReceptor.nombre && ctrl.clienteEmisor.nombre);
    };

    ctrl.guardarClientes = function () {
      var clientesPedido = {
        "emisor": ctrl.clienteEmisor,
        "receptor": ctrl.clienteReceptor
      };

      agregarEnviosService.registrarClientesPedido(clientesPedido).then(function (respuestaRegistroClientes) {
        console.log(respuestaRegistroClientes.id);
        $state.go('agregarPaquetes');
      })
    };

    ctrl.init = function () {
      agregarEnviosService.obtenerCiudadesPaises().then(function (ciudadesPaises) {
        angular.copy(ciudadesPaises, ctrl.origenesLista);
        angular.copy(ciudadesPaises, ctrl.destinosLista);
      })
    };

    ctrl.init();

}]);
