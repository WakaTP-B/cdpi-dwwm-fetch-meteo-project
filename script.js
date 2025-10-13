function main() {
    navigator.geolocation.getCurrentPosition(onPosition);

    const search = document.querySelector('.search-bar');
    const cityInput = document.querySelector('.cityInput');

    if (search) {
        search.addEventListener('submit', e => {
            e.preventDefault();
            const cityInputValue = cityInput.value.toLowerCase();
            searchCity(cityInputValue)
        });
    }
}
main();

function searchCity(cityInputValue) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInputValue}&count=1&language=fr&format=json`)
        .then(response_obj => response_obj.json())
        .then(city => {
            console.log(city.results)
        })
}
function weather(lat, long) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code,precipitation&current=is_day,temperature_2m,precipitation,weather_code`)
        .then(response_obj => response_obj.json())
        .then(weather => {

        })
}


/**
 * S'execute quand l'utilisateur a accepté la geolocalisation.
 * 
 * @param {*} position_obj 
 */
function onPosition(position_obj) {

    const latUser = position_obj.coords.latitude;
    const longUser = position_obj.coords.longitude;

}

function weatherOnPosition() {

}