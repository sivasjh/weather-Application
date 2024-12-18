import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import rainIcon from './assets/rain.png';
import humidityIcon from "./assets/humidity.png";
import snowIcon from './assets/snow.png';
import windIcon from './assets/wind.png';
import womenIcon from './assets/women.png';

const Weatherdetails = ({ icon, temp, city, country, lat, log ,humidity,wind}) => {
  return (
    <>
      <div className='image'>
        <img className='siddhu' src={icon} alt='Image' />
      </div>
      <div className="temp">Temperature : {temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className='lat'>Latitude: </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>Longitude: </span>
          <span>{log}</span>
        </div>
      </div>
      <div className="datacontainer">
        <div className="element">
          <img src={humidityIcon} alt='humidity' className='icon'/>
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt='wind' className='icon'/>
          <div className='data'></div>
          <div className='wind-percent'>{wind} km/Hr</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
    </>
  );
};

function App() {
  let api_key= "4c71b0ae870615cf15ad7c9e6fd80ada";
  const [text, setText] = useState("Madurai");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('Madurai');
  const [country, setCountry] = useState('INDIA');
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": womenIcon,
    "03n": womenIcon,
    "04d": womenIcon,
    "04n": womenIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,  
    "13n": snowIcon,
  };

  const search = async() => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An Error Occurred:", error.message);
      setError("An Error Occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const resetHomePage = () => {
    setText("");
    setIcon(snowIcon);
    setTemp(0);
    setCity('');
    setCountry('INDIA');
    setLat(0);
    setLog(0);
    setHumidity(0);
    setWind(0);
    setCityNotFound(false);
    setError(null);
  };

  useEffect(() => { search() }, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text' className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className='search-icon' onClick={() => search()}>
            <img className="siva" src={searchIcon} alt='search' />
          </div>
        </div>

        {loading && <div className="loading-message">Loading.....</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && (
          <>
            <div className="city-not-found">City Not Found</div>
            <div className='home-button-container'>
            <button onClick={resetHomePage} className="home-button">Home</button>
            </div>
          </>
        )}
        {!loading && !cityNotFound && (
          <Weatherdetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />
        )}

        <p className='copyrights'>
          Designed By <span>Sivashankaran.R</span>
        </p>
      </div>
    </>
  );
}

export default App;
