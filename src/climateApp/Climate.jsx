import React, { useMemo, useState } from 'react'
import './style.css'
import search_icon from '../components/Assets/search.png'
import clear_icon from '../components/Assets/clear.png'
import cloud_icon from '../components/Assets/cloud.png'
import drizzle_icon from '../components/Assets/drizzle.png'
import rain_icon from '../components/Assets/rain.png'
import snow_icon from '../components/Assets/snow.png'
import wind_icon from '../components/Assets/wind.png'
import humidity_icon from '../components/Assets/humidity.png'

export const Climate = () => {

    let api_key = useMemo(() => "011fd5d0bc555bedd058fe4557eb9e8a", [])
    const [icon, setIcon] = useState(cloud_icon);
    const [searchValue, setSearchValue] = useState('')
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        wind: '',
        temperature: '',
        location: ''
    })

    const getWeatherData = async () => {
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=Metric&appid=${api_key}`);
            return response.json();
        }
        catch (err) {
            console.log(err)
        }
    }

    const search = async () => {

        const weatherResp = await getWeatherData();

        setWeatherData({
            humidity: weatherResp.main.humidity,
            wind: weatherResp.wind.speed,
            temperature: weatherResp.main.temp,
            location: weatherResp.name
        })

        if (weatherResp.weather[0].icon === "01d" || weatherResp.weather[0].icon === "01n") {
            setIcon(clear_icon);
        }
        else if (weatherResp.weather[0].icon === "02d" || weatherResp.weather[0].icon === "02n") {
            setIcon(cloud_icon);
        }
        else if (weatherResp.weather[0].icon === "03d" || weatherResp.weather[0].icon === "03n") {
            setIcon(drizzle_icon);
        }
        else if (weatherResp.weather[0].icon === "04d" || weatherResp.weather[0].icon === "04n") {
            setIcon(drizzle_icon);
        }
        else if (weatherResp.weather[0].icon === "09d" || weatherResp.weather[0].icon === "09n") {
            setIcon(rain_icon)
        }
        else if (weatherResp.weather[0].icon === "10d" || weatherResp.weather[0].icon === "10n") {
            setIcon(rain_icon)
        }
        else if (weatherResp.weather[0].icon === "13d" || weatherResp.weather[0].icon === "13n") {
            setIcon(snow_icon)
        }
        else {
            setIcon(clear_icon);
        }
    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text'
                    className='cityInput'
                    value={searchValue}
                    onChange={({ target: { value } }) => setSearchValue(value)}
                    placeholder='City'>
                </input>
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt="search icon" />
                </div>
            </div>
            <div className='weather-image'>
                <img src={icon} alt='weather icon'></img>

            </div>
            <div className='weather-temp'>{weatherData.temperature || '24'}</div>
            <div className='weather-location'> {weatherData.location || 'London'}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt="" />
                    <div className='data'></div>
                    <div className='humidity-percent'>{weatherData.humidity || '64%'}</div>
                    <div className='text'>Humidity</div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt="" />
                    <div className='data'></div>
                    <div className='wind-rate'>{weatherData.wind || '18 km/h'}</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    )
}

