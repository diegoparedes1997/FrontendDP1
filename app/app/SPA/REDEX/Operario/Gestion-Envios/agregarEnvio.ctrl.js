angular.module('vHackersModule').controller('agregarEnviosCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','agregarEnviosService',function($scope, $state, $stateParams, $uibModal, NgTableParams, agregarEnviosService){

    var ctrl = this;

    ctrl.registroValido = false;

    ctrl.clienteEmisor = {};

    ctrl.clienteReceptor = {};

    ctrl.origenesLista = [];

    ctrl.destinosLista = [];

    ctrl.idOperario = $scope.$parent.$parent.rCtrl.idUsuario;

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
        "emisor": ctrl.clienteEmisor.idCliente,
        "receptor": ctrl.clienteReceptor.idCliente,
        "operario": ctrl.idOperario
      };

      agregarEnviosService.registrarClientesPedido(clientesPedido).then(function (respuestaRegistroClientes) {
        console.log(respuestaRegistroClientes);

        //ctrl.destino.idPais
        //ctrl.origen.idPais

        $state.go('agregarPaquetes',{idEmisor: clientesPedido.emisor, idReceptor: clientesPedido.receptor, idOperario: clientesPedido.operario, idPaisOrigen: ctrl.origen.idPais, idPaisDestino: ctrl.destino.idPais});
      })
    };

    ctrl.init = function () {
      console.log(ctrl.idOperario);
      agregarEnviosService.obtenerCiudadesPaises().then(function (ciudadesPaises) {
        angular.copy(ciudadesPaises, ctrl.origenesLista);
        angular.copy(ciudadesPaises, ctrl.destinosLista);
      })
    };

    ctrl.init();

}]);
