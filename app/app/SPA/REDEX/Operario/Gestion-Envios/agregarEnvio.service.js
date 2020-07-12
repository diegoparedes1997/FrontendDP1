//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('agregarEnviosService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

 servicio.obtenerCiudadesPaises = function () {
   var urlObtenerCiudadesPaises = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerPaises';
   //var urlObtenerCiudadesPaises = 'SPA/REDEX/Operario/Gestion-Envios/obtenerCiudadesPaises.json';
   var $defer = $q.defer();
   $http({
       method: 'GET',
       url: urlObtenerCiudadesPaises
    }).then(function (respuesta) {
      $defer.resolve(respuesta.data);
    }).catch(function (error) {
      $defer.reject(error);
    });
   return $defer.promise;
 };

 servicio.registrarClientesPedido = function (clientesPedido) {
    var urlRegistrarClientesPedido = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/crearEncomienda?' + 'emisor=' + clientesPedido.emisor + '&receptor=' + clientesPedido.receptor + '&operario=' + clientesPedido.operario;
    //var urlRegistrarClientesPedido = 'SPA/REDEX/Operario/Gestion-Envios/registrarClientesPedido.json';
    console.log(urlRegistrarClientesPedido);
    var $defer = $q.defer();
    $http({
        //method: 'POST',
        method: 'GET',
        //data: clientesPedido,
        url: urlRegistrarClientesPedido,
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

}]);
