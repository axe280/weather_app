'use strict';

window.addEventListener('load', () => {
  let long;
  let lat;

  const temperatureDescription = document.querySelector('.temperature__description');
  const temperatureDegree = document.querySelector('.temperature__degree');
  const temperatureSection = document.querySelector('.temperature');
  const temperatureDegreeFormat = document.querySelector('.temperature__degree-style');
  const locationTimezone = document.querySelector('.location__timezone');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/5705cffd8ab5c630e439e863a739274f/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {temperature, summary, icon} = data.currently;
          const celsius = (temperature - 32) * (5 / 9);

          // set DOM Elments from the API
          temperatureDegree.textContent = Math.round(celsius);
          temperatureDegreeFormat.textContent = '°C';
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // Set Icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature degree format
          temperatureSection.addEventListener('click', () => {
            if (temperatureDegreeFormat.textContent === '°F') {
              temperatureDegreeFormat.textContent = "°C";
              temperatureDegree.textContent = Math.round(celsius);
            } else {
              temperatureDegreeFormat.textContent = "°F";
              temperatureDegree.textContent = Math.round(temperature);
            }
          });
        })
    })
  }


  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "#000"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    skycons.set(iconID, Skycons[currentIcon]);
  }
});