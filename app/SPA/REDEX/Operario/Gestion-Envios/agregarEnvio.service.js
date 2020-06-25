//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('agregarEnviosService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

 servicio.obtenerEnvios = function () {
   //var urlObtenerEnvios = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerEnvios';
   var urlObtenerEnvios = 'SPA/REDEX/Operario/Gestion-Envios/obtenerEnvios.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlObtenerEnvios
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

}]);
