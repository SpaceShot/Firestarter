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

function getGPSCoordinates() {
    let numVars = arguments.length;

    let geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    navigator.geolocation.watchPosition(
        function (position) {
            onGotCoordinates(position.coords)
        },
        null,
        geo_options);
}

function onGotCoordinates(coords)
{
    displayReading(coords);
    displayCoordinates(coords);
}

function displayCoordinates(coords) {
    $('#latitude').text(coords.latitude);
    $('#longitude').text(coords.longitude);
    $('#accuracy').text(coords.accuracy);
}

function displayReading(coords)
{
    //$('#readingsList').append('<li>Reading taken at: ' + new Date(Date.now()) + '. Lat:</li>')
    $('#readingsList').append(`<li>Reading taken at: ${new Date(Date.now())}. Lat:${coords.latitude} Long:${coords.longitude} Acc:${coords.accuracy}</li>`)
    let theNumber = $("#readingsList li").length
    while (theNumber > 5) {
        $("#readingsList li").first().detach()
        theNumber = $("#readingsList li").length
    }
    $('#readingsCount').text(theNumber)
}

function formatDate(date)
{
    return date.getHours() + ':'
}

