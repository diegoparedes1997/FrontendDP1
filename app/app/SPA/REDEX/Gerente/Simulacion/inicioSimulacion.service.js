//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('inicioSimulacionService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

 servicio.obtenerSimulaciones = function () {
   var urlObtenerSimulaciones = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerSimulaciones';
   //var urlObtenerSimulaciones = 'SPA/REDEX/Gerente/Simulacion/obtenerSimulaciones.json';
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

 servicio.realizarSimulacion = function (numeroDiasSimulacion) {
   //var urlRealizarSimulacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/simularEnvios?' + 'numeroDiasSimulacion=' + numeroDiasSimulacion;
   var urlRealizarSimulacion = 'SPA/REDEX/Gerente/Simulacion/realizarSimulacion.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlRealizarSimulacion
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

}]);
