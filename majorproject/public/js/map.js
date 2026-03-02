let map;
let marker;

document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    initMap();
});

function initMap() {
    const isShowPage =
        typeof listingCoordinates !== "undefined" &&
        listingCoordinates !== null;

    const centerCoords = isShowPage
        ? listingCoordinates
        : [77.575279, 12.976747];

    map = new maplibregl.Map({
        style: "https://tiles.openfreemap.org/styles/bright",
        center: centerCoords,
        zoom: isShowPage ? 12 : 9.5,
        container: "map",
    });

    map.addControl(new maplibregl.NavigationControl());

    if (isShowPage) {
        new maplibregl.Marker()
            .setLngLat(listingCoordinates)
            .addTo(map);
        return; // stop here
    }

    // create page logic below
   map.on("click", (e) => {
        setMarkerLocation(e.lngLat.lng, e.lngLat.lat);
    });

    const btn = document.getElementById("useMyLocation");
    if (btn) btn.addEventListener("click", getCurrentLocation);

    const locationInput = document.getElementById("location");
    const countryInput = document.getElementById("country");

    if (locationInput) locationInput.addEventListener("change", updateMapFromAddress);
    if (countryInput) countryInput.addEventListener("change", updateMapFromAddress);
}

function setMarkerLocation(lng, lat) {
    if (marker) marker.remove();

    marker = new maplibregl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);

    const latInput = document.getElementById("latitude");
    const lngInput = document.getElementById("longitude");

    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;

    map.setCenter([lng, lat]);
    map.setZoom(15);
    
    // Reverse geocode to fill location and country fields
    reverseGeocode(lng, lat);
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setMarkerLocation(pos.coords.longitude, pos.coords.latitude);
            reverseGeocode(pos.coords.longitude, pos.coords.latitude);
        },
        () => alert("Location permission denied")
    );
}

function reverseGeocode(lng, lat) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
            if (!data.display_name) return;

            const parts = data.display_name.split(",");
            const locationInput = document.getElementById("location");
            const countryInput = document.getElementById("country");

            if (locationInput) locationInput.value = parts[0].trim();
            if (countryInput) countryInput.value = parts[parts.length - 1].trim();
        })
        .catch(() => console.log("Reverse geocode failed"));
}

function updateMapFromAddress() {
    const location = document.getElementById("location")?.value;
    const country = document.getElementById("country")?.value;

    if (!location || !country) return;

    const address = `${location}, ${country}`;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`)
        .then(res => res.json())
        .then(data => {
            if (!data.length) return;
            setMarkerLocation(parseFloat(data[0].lon), parseFloat(data[0].lat));
        })
        .catch(() => console.log("Geocode failed"));
}