import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterIcon from '@mui/icons-material/Water';

const Api = {
  key: "957f734895e5b563416f286fe00db01a",
  base: "https://api.openweathermap.org/data/2.5/",
  units: "imperial",
}

export default function Weather() {
  const [query, setQuery] = useState("Delhi");
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(null);



  const handleInvalidCity = () => {
    setWeather({
      main: {
        temp: "",
      },
      name: "City Not Found",
      sys: {
        country: "",
      },
      weather: [
        {
          main: "",
        },
      ],
      wind: {
        speed: "",
      },
      coord: {
        lon: "",
        lat: "",
      },
    });
  };
  const fetchWeatherData = () => {
    if (query.trim() === '') {
      return console.log("Please Type A City Name")
    }
    fetch(`${Api.base}weather?q=${query}&appid=${Api.key}&units=${Api.units}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.cod === "404") {
          handleInvalidCity()
        } else {
          setWeather(result);
          const mainWeather = result.weather[0]?.main;
          setWeatherIcon(iconMappings[mainWeather] || null);
        }

        setQuery("");
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        handleInvalidCity();
      });
  }
  const handleButtonClick = () => {
    fetchWeatherData();
  };
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetchWeatherData()
    }
  }
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  const iconStyles = {
    fontSize: 100,
  };

  const iconMappings = {
    Haze: <WaterIcon />,
    Clouds: <CloudIcon />,
    Clear: <WbSunnyIcon />,
    Mist: <WaterIcon />,
    default: <CloudIcon style={iconStyles} />

  };

  const weatherBackgrounds = {
    Clouds: "cloudy-bg",
    Haze: "haze-bg",
    Clear: "sunny-bg",
    Rain: "rain-bg",
    default: "cloudy-bg",
  };
  const colorStyles = {
    color: "#F2BB13"
  }

  return (
    <div className={`container-box ${weatherBackgrounds[weather?.weather?.[0]?.main] || weatherBackgrounds.default}`}>
      
        <div>
          <TextField id="standard-basic" label="City" variant="standard" placeholder="Search" value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={search} />
          <Button className="btn" variant="text" onClick={handleButtonClick} style={{ fontSize: "40px" }} ><SearchIcon /></Button>
        </div>

      {(typeof weather.main != "undefined") ? (
        <div >
          <div className='city'>
            {weather.name},{weather.sys?.country}
          </div>
          <div className='date'>
            {dateBuilder(new Date())}
          </div>
          <div className='temp-container'>
            <div className='tempreture'>
              {Math.round((weather.main.temp -32)* 5/9)}°C
            </div>
            <div className='weather-icons'>
              {weatherIcon ? (
                React.cloneElement(weatherIcon, { style: iconStyles })
              ) : (
                iconMappings.default
              )}
              <div className="weather">
                {weather.weather[0].main}
              </div>

            </div>
          </div>
          <div className="wind">
            <div style={{ fontSize: "2rem" }}>Wind <hr /></div>
            <div className="wind-row">
              <div> <span  style={colorStyles}>Speed:</span> {Math.round(weather.wind.speed)} km/h</div>
              <div> <span style={colorStyles}>Deg:</span> {weather.wind.deg}</div>
              <div> <span style={colorStyles}>Gust:</span> {weather.wind.gust}</div>
            </div>
          </div>
          <hr />
          <div className='altitude-row'>
            <div className="lon">
             <span style={colorStyles}>Lon:</span>  {Math.round(weather.coord.lon)}
            </div>
            <div className="lat">
              <span style={colorStyles}>Lat:</span> {Math.round(weather.coord.lat)}
            </div>
          </div>
        </div>
      ) : " "}

    </div>
  )
}
