

function main() {

    const search = document.querySelector('.search-bar');
    const cityInput = document.querySelector('.cityInput');
    const findMeBtn = document.querySelector('.find-me');

    // SI formulaire
    if (search) {
        search.addEventListener('submit', e => {
            e.preventDefault();
            const city = cityInput.value.trim().toLowerCase();;
            if (city) searchCity(city);
        });
    }

    // SI loc user
    if (findMeBtn) {
        findMeBtn.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition(onPosition);
        });
    }
}
main();

// Recherche par ville
function searchCity(cityName) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`)
        .then(res => res.json())
        .then(dataCity => {
            // Verifie SI city.results et test lenght           
            if (dataCity.results?.length) {
                const city = dataCity.results[0];
                const latCity = city.latitude;
                const longCity = city.longitude;

                // condition ? valueTrue : valueFalse
                const displayName = city.name + (city.country ? ", " + city.country : "");

                putCoords(latCity, longCity);

                weather(latCity, longCity, displayName);
            }
        })
}


function weather(lat, long, placeName) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weathercode,precipitation`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const current = data.current;
            const temperature = current.temperature_2m;
            const code = current.weathercode;

            displayWeather(placeName, temperature, code);
        })
}

// function weather(lat, long, placeName) {
//     fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             const current = data.current_weather;
//             const temperature = current.temperature;
//             const code = current.weathercode;

//             displayWeather(placeName, temperature, code);
//         })
// }

function displayWeather(place, temperature, code) {
    document.querySelector('.display-city').textContent = place;
    document.querySelector('.display-temp').textContent = temperature + " °C";
    document.querySelector('.display-icon').textContent = IconByCode(code);
}

function IconByCode(code) {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "⛅";
    if (code === 3) return "☁️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95 && code <= 99) return "⛈️";
    return "🌡️";
}

/**
 * S'execute quand l'utilisateur a accepté la geolocalisation.
 * 
 * @param {*} position_obj 
 */

function onPosition(userCoords) {

    const latUser = userCoords.coords.latitude;
    const longUser = userCoords.coords.longitude;

    // Auto complete form
    putCoords(latUser, longUser);

    weather(latUser, longUser, "Ma position");
}

function putCoords(lat, long) {
    document.querySelector('.latitude').value = lat;
    document.querySelector('.longitutde').value = long;
}
