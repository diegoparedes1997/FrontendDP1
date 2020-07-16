//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('mapaSimulacionService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

 servicio.obtenerSimulacion = function (idSimulacion) {
   //var urlObtenerSimulacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerSimulaciones';
   var urlObtenerSimulacion = 'SPA/REDEX/Gerente/Simulacion/Mapa-Simulacion/obtenerSimulacion.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlObtenerSimulacion
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

 servicio.obtenerConcentracionesMapa = function () {
   //var urlRealizarSimulacion = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/simularEnvios?' + 'numeroDiasSimulacion=' + numeroDiasSimulacion;
   var urlRealizarSimulacion = 'SPA/REDEX/Gerente/Simulacion/Mapa-Simulacion/obtenerConcentracionesMapa.json';
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

 servicio.obtenerRutasPaletas = function () {
   //var urlObtenerRutasPaletas = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/simularEnvios?' + 'numeroDiasSimulacion=' + numeroDiasSimulacion;
   var urlObtenerRutasPaletas = 'SPA/REDEX/Gerente/Simulacion/Mapa-Simulacion/obtenerRutasPaletas1.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlObtenerRutasPaletas
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

}]);
