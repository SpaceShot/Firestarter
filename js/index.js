$(function () {
    if ("geolocation" in navigator) {
        navigator.geolocation;
        // $('#btnGetCoordinates').click(getGPSCoordinates);
        getGPSCoordinates();
    }
    else {
        $('#warning').text('No access to geolocation data');
        $('#warning').setAttr('hidden', false);
    }
});

var watchId = null;
var mapCreated = false;

function getGPSCoordinates() {
    let numVars = arguments.length;

    let geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    watchId = navigator.geolocation.watchPosition(
        function (position) {
            onGotCoordinates(position.coords)
        },
        null,
        geo_options);
}

function onGotCoordinates(coords) {
    displayReading(coords);
    displayCoordinates(coords);
    if (!mapCreated) {
        createMap(coords.latitude, coords.longitude);
        mapCreated = true;
    }
}

function displayCoordinates(coords) {
    $('#latitude').text(coords.latitude);
    $('#longitude').text(coords.longitude);
    $('#accuracy').text(coords.accuracy);
}

function displayReading(coords) {
    $('#readingsList').append(`<li>Reading taken at: ${new Date(Date.now())}. Lat:${coords.latitude} Long:${coords.longitude} Acc:${coords.accuracy}</li>`)
    let theNumber = $("#readingsList li").length
    while (theNumber > 5) {
        $("#readingsList li").first().detach()
        theNumber = $("#readingsList li").length
    }
    $('#readingsCount').text(theNumber)
}

function formatDate(date) {
    return date.getHours() + ':'
}

function createMap(lat, long) {
    var mymap = L.map('mapid').setView([lat, long], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    L.marker([lat, long]).addTo(mymap);

    // L.circle([51.508, -0.11], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(mymap);

    // L.polygon([
    //     [51.509, -0.08],
    //     [51.503, -0.06],
    //     [51.51, -0.047]
    // ]).addTo(mymap);
}

