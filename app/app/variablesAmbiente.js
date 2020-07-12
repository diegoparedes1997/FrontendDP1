(function (window) {
  window.__env = window.__env || {};
  //API url
  window.__env.apiUrl = 'http://localhost';
  //window.__env.apiUrl = 'http://200.16.7.187';
  //Url base
  window.__env.baseUrl = '/';
  //Puertos de microservicios
  //Puerto de aeropuertos
  window.__env.puertoAeropuertos = ':8081';
  //Permite depurar la aplicacion
  window.__env.enableDebug = true;
}(this));
