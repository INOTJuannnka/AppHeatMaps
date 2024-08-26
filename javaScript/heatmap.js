// Para más detalles sobre la licencia, consulta el archivo LICENSE.txt
let map;
let heatmapLayer;

function initMap() {
  map = L.map('map').setView([2.521755556, -76.68799167], 5);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
}

function createHeatmap(data) {
  console.log("data:",data);
  // "lng": 
  const dataString =   data;
  console.log("dataString:",dataString);
  //Poner el mapa en la posición de la primera coordenada
  map.setView([data[0].lat, data[0].lng], 15);
  //recorre el arreglo de datos y pone los puntos el el mapa dependiendo del tipo, cada tipo diferente es un color diferente
  dataString.forEach((point) => {
    let color = 'red';
    if (point.type === 'A') {
      color = 'blue';
    } else if (point.type === 'B') {
      color = 'green';
    }
    L.circle([point.lat, point.lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      radius: 100
    }).addTo(map);
  });
  try {
    // Convierte los datos al formato que leaflet-heat necesita
    const heatmapData = dataString.map((point) => {
      return [point.lat, point.lng, point.weight];
    });
    if (heatmapLayer) {
      map.removeLayer(heatmapLayer); // Elimina el heatmap existente del mapa
    }

    heatmapLayer = L.heatLayer(heatmapData, {
      radius: 25,
      blur: 15,
      gradient: {0.1: 'blue', 0.3: 'cyan', 0.5: 'lime', 0.7: 'yellow', 1.0: 'red'}
    }).addTo(map);
  } catch (e) {
    alert('Error en el formato JSON. Asegúrate de que esté correctamente formateado.');
    console.error(e);
  }
}

function resetHeatmap() {
  if (heatmapLayer) {
    map.removeLayer(heatmapLayer); // Elimina el heatmap existente del mapa
    heatmapLayer = null;
  }
}

// Inicializa el mapa cuando la página se carga
window.onload = initMap;