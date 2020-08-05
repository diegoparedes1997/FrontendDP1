//El $q aún se está evaluando si se va a emplear
angular.module("vHackersModule").service('loginService', ['$q', '$http', 'variablesAmbiente',
function($q, $http, variablesAmbiente) {

  var servicio = this;

  servicio.login = function(correo){

    //var urlObtenerUsuarios = 'data/usuariosLista.json';
    //var urlObtenerUsuarios = 'http://localhost:7003/usuarios';
    var urlObtenerUsuarios = variablesAmbiente.apiUrl + variablesAmbiente.puertoUsuarios + '/usuarios/login';
    var $defer = $q.defer();
    $http({
        method: 'POST',
        url: urlObtenerUsuarios,
        data: correo
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.validarUsuarioLogin = function (usuario, contraseña) {
    var urlObtenerUsuario = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/validarUsuario?usuario='+usuario+'&contra=' + contraseña;
    console.log(urlObtenerUsuario);
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerUsuario
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

  servicio.prueba = function () {
    var urlObtenerAeropuertos = variablesAmbiente.apiUrl + variablesAmbiente.puertoAeropuertos + '/obtenerAeropuertos';
    var $defer = $q.defer();
    $http({
        method: 'GET',
        url: urlObtenerAeropuertos
     }).then(function (respuesta) {
       $defer.resolve(respuesta.data);
     }).catch(function (error) {
       $defer.reject(error);
     });
    return $defer.promise;
  };

}]);
