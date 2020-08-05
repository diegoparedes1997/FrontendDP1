angular.module('vHackersModule').controller('loginCtrl', ['$scope', '$state', 'variablesAmbiente', '$cookies', 'loginService',
function ($scope, $state, variablesAmbiente, $cookies, loginService) {
  var ctrl = this;

  ctrl.usuario = {
    username: "",
    email: "",
    password: ""
  };
  ctrl.loginConGoogle = false;

  ctrl.login = function () {
    if (ctrl.usuario.email != "" && ctrl.usuario.password != "") {
      var correoLogin = {
        "correo": ctrl.usuario.email
      };

//      loginService.login(correoLogin).then(function (respuestaCookie) {
//        if (respuestaCookie.correo === 'Usuario no existe') {
//          swal("¡Opss!", "El usuario no se encuentra en base de datos" , "error");
//        }
//        else {
//          $cookies.put('usuarioID', respuestaCookie.id);
//          $cookies.put('rolActivoId', respuestaCookie.roles[0].id);
//          $cookies.put('inicioSesion', true);
//          $state.go('raiz');
//        }
//      });
    }
  }

  ctrl.probarCookie = function () {
    var idUsuario = $cookies.get('usuarioID');
    loginService.obtenerUsuarioLogin(idUsuario).then(function (usuario){
      ctrl.usuario.email = usuario.correo;
    });
  };

  ctrl.prueba = function () {
    loginService.prueba().then(function (aeropuertos) {
      console.log(aeropuertos);
    })
  };



  ctrl.pruebaLoginOperario = function () {
    console.log(ctrl.usuario.username, ctrl.usuario.password);
    loginService.validarUsuarioLogin(ctrl.usuario.username, ctrl.usuario.password).then(function(element){
      console.log(element);
      if (element.length == 1){
        $cookies.put('idOperario', element.idUsuario);
        $cookies.put('inicioSesion', true);
        $state.go('raiz');
      }else{

      }
    });

  };
}]);
