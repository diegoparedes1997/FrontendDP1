//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('agregarPaqueteService', ['$q', '$http', 'variablesAmbiente',
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

 servicio.registrarPaquetesEnvio = function (paquetesEnvio) {
    var urlRegistrarPaquetesEnvio = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/crearPaquete';
    //var urlRegistrarPaquetesEnvio = 'SPA/REDEX/Operario/Gestion-Envios/registrarClientesPedido.json';
    var $defer = $q.defer();
    $http({
        //method: 'POST',
        method: 'GET',
        //data: paquetesEnvio,
        url: urlRegistrarPaquetesEnvio
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.registrarPaqueteEnvio = function (paqueteEnvio) {
     var urlRegistrarPaquetesEnvio = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/crearPaquete?' + 'idEncomienda=' + paqueteEnvio.idEncomienda + '&descripcion=' + paqueteEnvio.descripcion;
     //var urlRegistrarPaquetesEnvio = 'SPA/REDEX/Operario/Gestion-Envios/registrarClientesPedido.json';
     console.log(urlRegistrarPaquetesEnvio);
     var $defer = $q.defer();
     $http({
         //method: 'POST',
         method: 'GET',
         //data: paquetesEnvio,
         url: urlRegistrarPaquetesEnvio,
         transformResponse: [function (data, headers) {
           return data;
         }]
      }).then(function (respuesta) {
        $defer.resolve(respuesta.data);
      }).catch(function (error) {
        $defer.reject(error);
      });
     return $defer.promise;
   };

   servicio.obtenerEncomienda = function (clientesPedido) {
      var urlRegistrarPaquetesEnvio = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/buscarEncomienda?' + 'emisor=' + clientesPedido.emisor + '&receptor=' + clientesPedido.receptor + '&operario=' + clientesPedido.operario;
      //var urlRegistrarPaquetesEnvio = 'SPA/REDEX/Operario/Gestion-Envios/registrarClientesPedido.json';
      console.log(urlRegistrarPaquetesEnvio);
      var $defer = $q.defer();
      $http({
          //method: 'POST',
          method: 'GET',
          //data: paquetesEnvio,
          url: urlRegistrarPaquetesEnvio
       }).then(function (respuesta) {
         $defer.resolve(respuesta.data);
       }).catch(function (error) {
         $defer.reject(error);
       });
      return $defer.promise;
    };

}]);
