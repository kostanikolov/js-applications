function attachEvents() {
    let inputLocation = document.getElementById('location');
    let submitLocation = document.getElementById('submit');

    const urls = {
        locationUrl: `https://judgetests.firebaseio.com/locations.json`,
        weatherUrl: `https://judgetests.firebaseio.com/forecast/today/`,
        upcomingUrl: `https://judgetests.firebaseio.com/forecast/upcoming/`,
    }

    const townCodes = {
        'New York': 'ny',
        'London': 'london',
        'Barcelona': 'barcelona',
    }

    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    }

    submitLocation.addEventListener('click', setWeatherInfo);

    function setWeatherInfo() {
        let currentWeather = document.getElementById('current');
        currentWeather.removeChild(currentWeather.lastChild);
        let upcomingWeather = document.getElementById('upcoming');
        upcomingWeather.removeChild(upcomingWeather.lastChild);

        getLocation();
        getUpcomingWeather();
    }

    function getLocation() {
        fetch(urls.locationUrl)
            .then(handler)
            .then((data) => {
                let town = data.filter(o => o.name === inputLocation.value)[0];
                let townCode = town.code;
                let weatherUrl = `${urls.weatherUrl}${townCode}.json`;

                fetch(weatherUrl)
                    .then(handler)
                    .then((data) => {
                        let locationForecast = data.forecast;
                        let condition = locationForecast.condition;
                        let high = locationForecast.high;
                        let low = locationForecast.low;

                        let forecastsDiv = createElement('div', 'forecasts');
                        let symbolSpan = createElement('span', 'condition symbol', symbols[condition]);
                        let conditionSpan = createElement('span', 'condition');

                        let locationSpan = createElement('span', 'forecast-data', data.name);
                        let temperaturesSpan = createElement('span', 'forecast-data', `${low}${symbols.Degrees}/${high}${symbols.Degrees}`);
                        let weatherSpan = createElement('span', 'forecast-data', condition);

                        conditionSpan.appendChild(locationSpan);
                        conditionSpan.appendChild(temperaturesSpan);
                        conditionSpan.appendChild(weatherSpan);

                        forecastsDiv.appendChild(symbolSpan);
                        forecastsDiv.appendChild(conditionSpan);
                        document.getElementById('current').appendChild(forecastsDiv);
                        document.getElementById('forecast').style.display = 'block';
                    });
            });
    }

    function setErrorMessage() {
        document.getElementById('forecast').style.display = 'block';
        document.getElementById('upcoming').style.display = 'none';

        let conditionLabel = document.getElementById('current').children[0];
        conditionLabel.textContent = 'Error!';
    }

    function getUpcomingWeather() {
        let upcomingWeatherUrl = `${urls.upcomingUrl}${townCodes[inputLocation.value]}.json`;

        fetch(upcomingWeatherUrl)
            .then(handler)
            .then((data) => {
                let upcomingDiv = document.getElementById('upcoming');
                let forecastInfo = createElement('div', 'forecast-info');

                let upcomingForecast = data.forecast;
                upcomingForecast.forEach(forecast => {
                    let condition = forecast.condition;
                    let high = forecast.high;
                    let low = forecast.low;

                    let currUpcomingSpan = createElement('span', 'upcoming');
                    let symbolSpan = createElement('span', 'symbol', symbols[condition]);
                    let temperaturesSpan = createElement('span', 'forecast-data', `${low}${symbols.Degrees}/${high}${symbols.Degrees}`);
                    let weatherSpan = createElement('span', 'forecast-data', condition);

                    currUpcomingSpan.appendChild(symbolSpan);
                    currUpcomingSpan.appendChild(temperaturesSpan);
                    currUpcomingSpan.appendChild(weatherSpan);
                    forecastInfo.appendChild(currUpcomingSpan);
                    upcomingDiv.appendChild(forecastInfo);
                });
            });
    }

    function createElement(tagName, className, textContent) {
        let element = document.createElement(tagName);

        if (className) {
            element.setAttribute('class', className);
        }

        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    }

    function handler(response) {
        if (response.status >= 400) {
            throw new Error('Error!');
        }

        return response.json();
    }
}

attachEvents();

// location info:            https://judgetests.firebaseio.com/locations.json
// weather info:             https://judgetests.firebaseio.com/forecast/today/{code}.json
// upcoming three days info: https://judgetests.firebaseio.com/forecast/upcoming/{code}.json

// •	Sunny			&#x2600; // ☀
// •	Partly sunny	&#x26C5; // ⛅
// •	Overcast		&#x2601; // ☁
// •	Rain			&#x2614; // ☂
// •	Degrees		    &#176;   // °
