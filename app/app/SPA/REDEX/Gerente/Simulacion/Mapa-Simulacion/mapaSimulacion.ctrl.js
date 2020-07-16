angular.module('vHackersModule').controller('mapaSimulacionCtrl', ['$scope', '$state' , '$stateParams', '$uibModal', '$interval',
'NgTableParams','mapaSimulacionService',function($scope, $state, $stateParams, $uibModal, $interval, NgTableParams, mapaSimulacionService){
    var ctrl = this;
    ctrl.idSimulacion = $stateParams.idSimulacion
    ctrl.numeroDiasSimulacion = 0;
    ctrl.simulacionRealizada = false;
    ctrl.numeroRutasPaletasProcesadas = 0;
    ctrl.rutasPaletas = [];
    ctrl.rutasPaletasActuales = [];
    ctrl.rutasActuales = [];
    ctrl.puntosActuales = [];
    ctrl.nombresPuntosActuales = [];
    ctrl.numeroRutasPaletasActuales = 0;
    ctrl.counter = 0
    ctrl.steps = 500;
    ctrl.mapaRutas = undefined;
    ctrl.eventoCargaRutas = undefined;
    ctrl.tiempoCargaNuevaAnimacion = 30000;//Medido en milisegundos

    ctrl.map = {
        zoom: 0.4,
        //center: [ -74.804486, 10.980780 ]
        center: [ 0, 15 ]
    };

    ctrl.markers = [{
        id: 'marker-1',
        lat: -74.804486,
        lng: 10.980780
    }, {
        id: 'marker-2',
        lat: -74.812486,
        lng: 10.985781
    }];

    // San Francisco
    var origin = [-122.414, 37.776];

    var origin2 = [-77.02824, -12.04318];

    // Washington DC
    var destination = [-77.032, 38.913];

    // A simple line from origin to destination.
    var route = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': [origin, destination]
          }
        }
      ]
    };

    var route2 = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': [origin2, destination]
          }
        }
      ]
    };

    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    var point = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': origin
          }
        }
      ]
    };

    var point2 = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': origin2
          }
        }
      ]
    };

    // Calculate the distance in kilometers between route start/end point.
    var lineDistance = turf.lineDistance(route.features[0], 'kilometers');

    var lineDistance2 = turf.lineDistance(route2.features[0], 'kilometers');

    var arc = [];

    var arc2 = [];

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    var steps = 500;

    // Draw an arc between the `origin` & `destination` of the two points
    for (var i = 0; i < lineDistance; i += lineDistance / steps) {
      var segment = turf.along(route.features[0], i, 'kilometers');
      arc.push(segment.geometry.coordinates);
    }

    for (var i = 0; i < lineDistance2; i += lineDistance2 / steps) {
      var segment = turf.along(route2.features[0], i, 'kilometers');
      arc2.push(segment.geometry.coordinates);
    }

    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc;

    route2.features[0].geometry.coordinates = arc2;

    // Used to increment the value of the point measurement against the route.
    var counter = 0;

    ctrl.funcionCargaMapa = function (map) {
      // Add a source and layer displaying a point which will be animated in a circle.
      map.addSource('route', {
        'type': 'geojson',
        'data': route
      });

      map.addSource('point', {
        'type': 'geojson',
        'data': point
      });

      map.addSource('route2', {
        'type': 'geojson',
        'data': route2
      });

      map.addSource('point2', {
        'type': 'geojson',
        'data': point2
      });

      map.addLayer({
        'id': 'route',
        'source': 'route',
        'type': 'line',
        'paint': {
          'line-width': 2,
          'line-color': '#007cbf'
        }
      });

      map.addLayer({
        'id': 'point',
        'source': 'point',
        'type': 'symbol',
        'layout': {
          'icon-image': 'airport-15',
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        }
      });

      map.addLayer({
        'id': 'route2',
        'source': 'route2',
        'type': 'line',
        'paint': {
          'line-width': 2,
          'line-color': '#007cbf'
        }
      });

      map.addLayer({
        'id': 'point2',
        'source': 'point2',
        'type': 'symbol',
        'layout': {
          'icon-image': 'airport-15',
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        }
      });

      function animate() {
        // Update point geometry to a new position based on counter denoting
        // the index to access the arc.
        point.features[0].geometry.coordinates =
        route.features[0].geometry.coordinates[counter];

        point2.features[0].geometry.coordinates =
        route2.features[0].geometry.coordinates[counter];

        // Calculate the bearing to ensure the icon is rotated to match the route arc
        // The bearing is calculate between the current point and the next point, except
        // at the end of the arc use the previous point and the current point
        point.features[0].properties.bearing = turf.bearing(
          turf.point(
            route.features[0].geometry.coordinates[
              counter >= steps ? counter - 1 : counter
            ]
          ),
          turf.point(
            route.features[0].geometry.coordinates[
              counter >= steps ? counter : counter + 1
            ]
          )
        );

        point2.features[0].properties.bearing = turf.bearing(
          turf.point(
            route2.features[0].geometry.coordinates[
              counter >= steps ? counter - 1 : counter
            ]
          ),
          turf.point(
            route2.features[0].geometry.coordinates[
              counter >= steps ? counter : counter + 1
            ]
          )
        );

        // Update the source with this new data.
        map.getSource('point').setData(point);

        map.getSource('point2').setData(point2);

        // Request the next frame of animation so long the end has not been reached.
        if (counter < steps) {
          requestAnimationFrame(animate);
        }

        counter = counter + 1;
      }

      // document.getElementById('replay').addEventListener('click', function() {
      //   // Set the coordinates of the original point back to origin
      //   point.features[0].geometry.coordinates = origin;
      //
      //   // Update the source layer
      //   map.getSource('point').setData(point);
      //
      //   // Reset the counter
      //   counter = 0;
      //
      //   // Restart the animation.
      //   animate(counter);
      // });

      // Start the animation.
      animate(counter);
    };

    ctrl.obtenerRutaPuntoAnimacion = function (rutaPaleta) {
      //var origin = [-122.414, 37.776];
      var origin = [rutaPaleta.origen.longitud, rutaPaleta.origen.latitud];

      //var destination = [-77.032, 38.913];
      var destination = [rutaPaleta.destino.longitud, rutaPaleta.destino.latitud];

      // A simple line from origin to destination.
      var route = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [origin, destination]
            }
          }
        ]
      };

      // A single point that animates along the route.
      // Coordinates are initially set to origin.
      var point = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'Point',
              'coordinates': origin
            }
          }
        ]
      };

      // Calculate the distance in kilometers between route start/end point.
      var lineDistance = turf.lineDistance(route.features[0], 'kilometers');

      var arc = [];

      // Number of steps to use in the arc and animation, more steps means
      // a smoother arc and animation, but too many steps will result in a
      // low frame rate
      var steps = 500;

      // Draw an arc between the `origin` & `destination` of the two points
      for (var i = 0; i < lineDistance; i += lineDistance / steps) {
        var segment = turf.along(route.features[0], i, 'kilometers');
        arc.push(segment.geometry.coordinates);
      }

      // Update the route with calculated arc coordinates
      route.features[0].geometry.coordinates = arc;

      ctrl.rutasActuales.push(route);
      ctrl.puntosActuales.push(point);

    };

    ctrl.obtenerRutasPuntosAnimacion = function () {
      for (var i = 0; i < ctrl.numeroRutasPaletasActuales; i++) {
        ctrl.obtenerRutaPuntoAnimacion(ctrl.rutasPaletasActuales[i]);
      }
    };

    ctrl.realizarAnimacionPunto = function (map, rutaActual, puntoActual, nombrePuntoActual, counter) {
      // Update point geometry to a new position based on counter denoting
      // the index to access the arc.
      puntoActual.features[0].geometry.coordinates =
      rutaActual.features[0].geometry.coordinates[counter];

      // Calculate the bearing to ensure the icon is rotated to match the route arc
      // The bearing is calculate between the current point and the next point, except
      // at the end of the arc use the previous point and the current point
      puntoActual.features[0].properties.bearing = turf.bearing(
        turf.point(
          rutaActual.features[0].geometry.coordinates[
            (counter >= (ctrl.steps-1)) ? counter - 1 : counter
          ]
        ),
        turf.point(
          rutaActual.features[0].geometry.coordinates[
            (counter >= (ctrl.steps-1)) ? counter : counter + 1
          ]
        )
      );

      // Update the source with this new data.
      map.getSource(nombrePuntoActual).setData(puntoActual);


    };

    ctrl.cargarAvionAnimacion = function (map, rutaActual, puntoActual) {

      var nombreRuta = 'route' + ctrl.numeroRutasPaletasProcesadas;
      var nombrePunto = 'point' + ctrl.numeroRutasPaletasProcesadas;

      ctrl.nombresPuntosActuales.push(nombrePunto);

      ctrl.numeroRutasPaletasProcesadas += 1;

      map.addSource(nombreRuta, {
        'type': 'geojson',
        'data': rutaActual
      });

      map.addSource(nombrePunto, {
        'type': 'geojson',
        'data': puntoActual
      });

      map.addLayer({
        'id': nombreRuta,
        'source': nombreRuta,
        'type': 'line',
        'paint': {
          'line-width': 2,
          'line-color': '#007cbf'
        }
      });

      map.addLayer({
        'id': nombrePunto,
        'source': nombrePunto,
        'type': 'symbol',
        'layout': {
          'icon-image': 'airport-15',
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        }
      });

    };

    ctrl.realizarAnimacion = function () {
      for (var i = 0; i < ctrl.rutasActuales.length; i++) {
        ctrl.realizarAnimacionPunto(ctrl.mapaRutas, ctrl.rutasActuales[i], ctrl.puntosActuales[i], ctrl.nombresPuntosActuales[i], ctrl.counter);
      }

      ctrl.counter = ctrl.counter + 1;

      // Request the next frame of animation so long the end has not been reached.
      if (ctrl.counter < ctrl.steps) {
        requestAnimationFrame(ctrl.realizarAnimacion);
      }
    }

    ctrl.cargarAvionesAnimaciones = function (map) {
      // Used to increment the value of the point measurement against the route.
      if (!ctrl.mapaRutas) {
        ctrl.mapaRutas = map;
      }

      var counter = 0;
      for (var i = 0; i < ctrl.rutasActuales.length; i++) {
        ctrl.cargarAvionAnimacion(map, ctrl.rutasActuales[i], ctrl.puntosActuales[i]);
      }

      // function realizarAnimacion() {
      //   for (var i = 0; i < ctrl.rutasActuales.length; i++) {
      //     ctrl.realizarAnimacionPunto(map, ctrl.rutasActuales[i], ctrl.puntosActuales[i], ctrl.nombresPuntosActuales[i], counter);
      //   }
      //
      //   counter = counter + 1;
      //
      //   // Request the next frame of animation so long the end has not been reached.
      //   if (counter < steps) {
      //     requestAnimationFrame(realizarAnimacion);
      //   }
      //
      // }
      // Start the animation.
      ctrl.realizarAnimacion(counter);
    };

    ctrl.resetearPunto = function (puntoActual, rutaPaleta) {
      var origin = [rutaPaleta.origen.longitud, rutaPaleta.origen.latitud];
      puntoActual.features[0].geometry.coordinates = origin;
    };

    ctrl.resetearPuntos = function () {
      for (var i = 0; i < ctrl.numeroRutasPaletasActuales; i++) {
        ctrl.resetearPunto(ctrl.puntosActuales[i], ctrl.rutasPaletasActuales[i]);
      }
    };

    ctrl.resetearPuntoMapa = function (puntoActual, nombrePuntoActual) {
      //map.getSource('point').setData(point);
      ctrl.mapaRutas.getSource(nombrePuntoActual).setData(puntoActual);
    };

    ctrl.resetearPuntosMapa = function () {
      for (var i = 0; i < ctrl.puntosActuales.length; i++) {
        ctrl.resetearPuntoMapa(ctrl.puntosActuales[i], ctrl.nombresPuntosActuales[i]);
      }
    };

    ctrl.cargarNuevasAnimaciones = function () {
      // Set the coordinates of the original point back to origin
      ctrl.resetearPuntos();

      // Update the source layer
      ctrl.resetearPuntosMapa();

      // Reset the counter
      //var counter = 0;
      ctrl.counter = 0;

      // Restart the animation.
      ctrl.realizarAnimacion(counter);
    };

    ctrl.terminarEventosAnimaciones = function () {
      if (angular.isDefined(ctrl.eventoCargaRutas)) {
        $interval.cancel(ctrl.eventoCargaRutas);
        ctrl.eventoCargaRutas = undefined;
      }
    };

    ctrl.regresar = function () {
      $state.go('inicioSimulacion');
    };

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      ctrl.terminarEventosAnimaciones();
    });

    ctrl.init = function () {
      console.log(ctrl.idSimulacion);
      mapaSimulacionService.obtenerSimulacion(ctrl.idSimulacion).then(function (simulacion) {
        console.log(simulacion);

        mapaSimulacionService.obtenerRutasPaletas().then(function (rutasPaletasActuales) {
          ctrl.rutasPaletasActuales = rutasPaletasActuales;
          ctrl.numeroRutasPaletasActuales = ctrl.rutasPaletasActuales.length
          console.log(ctrl.rutasPaletasActuales);
          ctrl.obtenerRutasPuntosAnimacion();
          ctrl.eventoCargaRutas = $interval(ctrl.cargarNuevasAnimaciones, ctrl.tiempoCargaNuevaAnimacion);
        });

      });
    };

    ctrl.init();

}]);
