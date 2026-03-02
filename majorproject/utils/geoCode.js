const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function geocodeAddress(address) {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
            headers: {
                "User-Agent": "your-app-name"
            }
        }
    );

    const data = await response.json();
    if (!data.length) return null;

    return {
        lng: parseFloat(data[0].lon),
        lat: parseFloat(data[0].lat)
    };
}

module.exports = { geocodeAddress };