//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('listaDetalleEnvioService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

 servicio.obtenerDetalleEnvio = function (idEnvio) {
   var urlObtenerDetalleEnvio = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/consultarPaquetesEnvio?' + 'idEnvio=' + idEnvio;
   //var urlObtenerClientes = 'SPA/REDEX/Operario/Gestion-Envios/Gestion-Clientes/obtenerClientes.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlObtenerDetalleEnvio
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

}]);
