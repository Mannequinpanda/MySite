
// "borrowed" from MDN's geolocation API example
function geoFindMe() {
    console.log("calling geofindme");
    const status = document.querySelector('#weatherStatus');
    
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const latitude_input = document.querySelector("#latitude-input");
        const longitude_input = document.querySelector("#longitude-input");

        longitude_input.value = longitude;
        latitude_input.value = latitude;
        console.log(`${latitude}, ${longitude}`);
        status.textContent = "";
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
}

WEATHER_CODES = {
0:  'Clear sky',
1:  'Mainly clear',
2:  'Partly cloudy',
3:  'Overcast',
45: 'Fog',
48: 'Depositing Rime fog',
51: 'Light Drizzle',
53: 'Moderate Drizzle',
55: 'Dense Drizzle',
57: 'Light Freezing Drizzle',
57: 'Dense Freezing Drizzle',
61: 'Slight Rain',
63: 'Moderate Rain',
65: 'Heavy Rain',
66: 'Light Freezing Rain',
67: 'Heavy Freezing Rain',
71: 'Slight Snow fall',
73: 'Moderate Snow fall',
75: 'Heavy Snow fall',
77: 'Snow grains',
80: 'Slight Rain showers',
81: 'Moderate Rain showers',
82: 'Violent Rain showers',
85: 'Slight Snow showers slight and heavy',
86: 'Heavy Snow showers slight and heavy',
95: 'Thunderstorm',
96: 'Thunderstorm with slight hail',
99: 'Thunderstorm with heavy hail',
}

function getWeather() {
    let latitude = document.getElementById("latitude-input").value
    let longitude = document.getElementById("longitude-input").value

    let meteo_url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + 
    "&longitude=" + longitude + "&current_weather=true&temperature" + 
    "_unit=fahrenheit&windspeed_unit=ms&timezone=America%2FChicago"

    let sunrise_url = "https://api.sunrise-sunset.org/json?lat=" + latitude + 
    "&lng=" + longitude + "&formatted=0";

    //should run concurrently
    showMeteo(meteo_url);
    showSunrise(sunrise_url);
}

async function showMeteo(url) {
  let meteo_response = await fetch(url);

  if (meteo_response.ok) {
    let meteo_json = await meteo_response.json();

    document.getElementById("temp-display").innerText = "Temperature: " + meteo_json.current_weather.temperature + " Degrees F";
    document.getElementById("cloud-cover-display").innerText = WEATHER_CODES[meteo_json.current_weather.weathercode];
  } else {
    console.log("Error with meteo get request" + meteo_response);
  }

}

async function showSunrise(url) {
  let sunrise_response = await fetch(url);
    

  if (sunrise_response.ok) {
    let sunrise_json = await sunrise_response.json();

    let sunrise = new Date(sunrise_json.results.sunrise);
    let sunset = new Date(sunrise_json.results.sunset);

    document.getElementById("sunrise-display").innerText = "Sunrise: " + sunrise.toLocaleTimeString();
    document.getElementById("sunset-display").innerText = "Sunset: " + sunset.toLocaleTimeString();
  } else {
    console.log("Error with sunrise-sunset get request" + sunrise_response);
  }
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
document.querySelector("#get-weather-btn").addEventListener('click', getWeather);