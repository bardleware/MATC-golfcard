app.controller('mapCtrl', function ($scope) {
  $scope.marker;
  //for the real app $scope.teeMarker && $scope.greenMarker

  /*
    Green Marker: https://s3-us-west-2.amazonaws.com/bardleware1/Green_Marker2.png
    scaledSize: new google.maps.Size(40, 40)
    
    
    Tee Marker: 
        url: 'https://s3-us-west-2.amazonaws.com/bardleware1/Tee.png',
        scaledSize: new google.maps.Size(50, 40)
  */
  var location = {
    "lat": 40.4295033232823,
    "lng": -111.902993917466,
    "icon":{
      url: 'https://s3-us-west-2.amazonaws.com/bardleware1/Green_Marker2.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  };
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(location.lat, location.lng),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  createMarker(location);

  function createMarker(info) {
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.lng),
      icon: info.icon
    });

    $scope.marker = marker;
  };

});
