angular.module('vHackersModule').controller('mapaSimulacionCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',
'NgTableParams','mapaSimulacionService',function($scope, $state, $stateParams, $uibModal, NgTableParams, mapaSimulacionService){
    var ctrl = this;
    ctrl.idSimulacion = $stateParams.idSimulacion
    ctrl.numeroDiasSimulacion = 0;
    ctrl.simulacionRealizada = false;

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

      function animate() {
        // Update point geometry to a new position based on counter denoting
        // the index to access the arc.
        point.features[0].geometry.coordinates =
        route.features[0].geometry.coordinates[counter];

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

        // Update the source with this new data.
        map.getSource('point').setData(point);

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

    ctrl.regresar = function () {
      $state.go('inicioSimulacion');
    };

    ctrl.init = function () {
      console.log(ctrl.idSimulacion);
      mapaSimulacionService.obtenerSimulacion(ctrl.idSimulacion).then(function (simulacion) {
        console.log(simulacion);
      });
    };

    ctrl.init();

}]);
