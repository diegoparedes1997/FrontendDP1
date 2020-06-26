//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('listaClientesService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

 servicio.obtenerClientes = function () {
   //var urlObtenerClientes = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerEnvios';
   var urlObtenerClientes = 'SPA/REDEX/Operario/Gestion-Envios/Gestion-Clientes/obtenerClientes.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlObtenerClientes
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

}]);
