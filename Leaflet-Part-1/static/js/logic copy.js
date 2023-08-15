// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 3
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
function markerSize(magnitude) {
    return Math.sqrt(magnitude) * 50;
}

d3.json(link).then(function(data) {
    let features = data.features;
    
    features.forEach(feature => {
        let magnitude = feature.properties.mag;
        let coordinates = feature.geometry.coordinates;
        
        L.circleMarker([coordinates[1], coordinates[0]], {
            color: 'red',
            fillColor: 'green',
            fillOpacity: 0.5,
            radius: markerSize(magnitude) // Corrected: use `magnitude` instead of `earthquake.magnitude`
        })
        .bindPopup(`Magnitude: ${magnitude}`)
        .addTo(myMap);
    });
});

// // Creating the map object
// let myMap = L.map("map", {
//     center: [40.7128, -74.0059],
//     zoom: 3
// });

// // // Adding the tile layer
// // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// // }).addTo(myMap);

// // Use this link to get the GeoJSON data.
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// // Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
// function markerSize(magnitude) {
//     return Math.sqrt(magnitude) * 5;
// }

// d3.json(link).then(function(data) {
//     let features = data.features;
    
//     features.forEach(feature => {
//         let magnitude = feature.properties.mag;
//         let coordinates = feature.geometry.coordinates;
        
//         L.circleMarker([coordinates[1], coordinates[0]], {
//             color: 'green',
//             fillColor: 'green',
//             fillOpacity: 0.5,
//             radius: markerSize(magnitude) // Corrected: use `magnitude` instead of `earthquake.magnitude`
//         })
//         .bindPopup(`Magnitude: ${magnitude}`)
//         .addTo(myMap);
//     });
// });