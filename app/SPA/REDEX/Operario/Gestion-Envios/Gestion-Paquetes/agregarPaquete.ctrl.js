angular.module('vHackersModule').controller('agregarPaqueteCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','agregarPaqueteService',function($scope, $state, $stateParams, $uibModal, NgTableParams, agregarPaqueteService){

    var ctrl = this;

    ctrl.listaPaquetes = [];
    ctrl.descripcionPaquete = '';
    ctrl.nuevoId = 1;
    ctrl.idEncomienda = 1;
    ctrl.idPaisOrigen = 0;
    ctrl.idPaisDestino = 0;
    ctrl.idOrigen = 0;
    ctrl.idDestino = 0;

    ctrl.tablaPaquetes = new NgTableParams({}, { dataset: ctrl.listaPaquetes });

    ctrl.agregarPaquete = function () {

      //ctrl.nuevoId += 1;

      // ctrl.listaPaquetes.push(paqueteNuevo);
      //
      // ctrl.descripcionPaquete = '';

      //$scope.$apply();

      var rutaEnvio = {
        idRuta: -1,//Se inicializa este valor y luego se calcula en el servicio
        idOrigen: ctrl.idOrigen,
        idDestino: ctrl.idDestino
      };

      agregarPaqueteService.registrarRuta(rutaEnvio).then(function (idRutaNueva) {
        console.log(idRutaNueva);

        var paqueteNuevo = {
          //id: ctrl.nuevoId,
          idEncomienda: ctrl.idEncomienda,
          descripcion: ctrl.descripcionPaquete,
          idRuta: idRutaNueva
        };

        agregarPaqueteService.registrarPaqueteEnvio(paqueteNuevo).then(function (respuestaPaquetesEnvio) {
          console.log(respuestaPaquetesEnvio.id);
          ctrl.listaPaquetes.push(paqueteNuevo);

          ctrl.descripcionPaquete = '';
        });

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
      ctrl.idPaisOrigen = $stateParams.idPaisOrigen;
      ctrl.idPaisDestino = $stateParams.idPaisDestino;
      var datosEncomienda = {
        "emisor": $stateParams.idEmisor,
        "receptor": $stateParams.idReceptor,
        "operario": $stateParams.idOperario
      };

      agregarPaqueteService.obtenerAeropuertoPais(ctrl.idPaisOrigen).then(function (aeropuertos) {
        ctrl.aeropuertosOrigen = aeropuertos;
        console.log(aeropuertos);
        ctrl.idOrigen = ctrl.aeropuertosOrigen[0].idAeropuerto;
      });

      agregarPaqueteService.obtenerAeropuertoPais(ctrl.idPaisDestino).then(function (aeropuertos) {
        ctrl.aeropuertosDestino = aeropuertos;
        console.log(aeropuertos);
        ctrl.idDestino = ctrl.aeropuertosDestino[0].idAeropuerto;
      });

      agregarPaqueteService.obtenerEncomienda(datosEncomienda).then(function (envios) {
        ctrl.envios = envios;
        console.log(envios);
        ctrl.idEncomienda = ctrl.envios[0].idEncomienda;
      });
    };

    ctrl.init();

}]);
