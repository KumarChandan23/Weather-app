import React, { useState } from 'react';
import axios from 'axios';
import style from './index.module.css';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const fetchWeather = async () => {
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d9b4a1abf8a7196c821af1838ca65b0d`);
            setWeather(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = () => {
        fetchWeather();
    }

    return (
        <main className={style.weather_container}>
            <h1>Weather app</h1>
            <input type="text" name="city" placeholder="Enter City" value={city} onChange={handleCityChange} />
            <button onClick={handleClick}>Get Weather</button>
            {weather && (
                <div className={style.weather_info}>
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p className={style.temp}>
                        {Math.round(weather.main.temp - 273.15)}
                        <sup className={style.degree}>°C </sup>
                    </p>  {/* &deg;c */}

                </div>
            )}
        </main>
    );
}

export default App;