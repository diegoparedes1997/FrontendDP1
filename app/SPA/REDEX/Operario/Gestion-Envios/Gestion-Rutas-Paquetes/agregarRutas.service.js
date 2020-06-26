//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('agregarRutasService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

 servicio.obtenerPaquetes = function () {
   //var urlObtenerPaquetes = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerEnvios';
   var urlObtenerPaquetes = 'SPA/REDEX/Operario/Gestion-Envios/Gestion-Rutas-Paquetes/obtenerPaquetes.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlObtenerPaquetes
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

 servicio.calcularRutasEnvio = function (paquetesCalcularRutas) {
   //var urlCalcularRutasEnvio = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerEnvios';
   var urlCalcularRutasEnvio = 'SPA/REDEX/Operario/Gestion-Envios/Gestion-Rutas-Paquetes/calcularRutasEnvio.json';
   var $defer = $q.defer();
   $http({
       //method: 'POST',
       method: 'GET',
       //data: paquetesCalcularRutas,
       url: urlCalcularRutasEnvio
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

 servicio.registrarRutasEnvio = function (rutasEnvio) {
    //var urlRegistrarRutasEnvio = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerEnvios';
    var urlRegistrarRutasEnvio = 'SPA/REDEX/Operario/Gestion-Envios/registrarClientesPedido.json';
    var $defer = $q.defer();
    $http({
        //method: 'POST',
        method: 'GET',
        //data: rutasEnvio,
        url: urlRegistrarRutasEnvio
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
