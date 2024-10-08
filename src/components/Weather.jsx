import React, {useEffect,useState,useRef} from 'react'
import './Weather.css'
import search_icon from "../assets/search-icon.jpg"
import humidity_icon from "../assets/humidity-icon.jpg"
import wind_icon from "../assets/wind-icon.png"


const Weather = () => {
    const inputRef = useRef();
    const [weatherData , setWeatherData] = useState(false);

    const search = async (city) =>{
        if(city === "")
        {
            alert("Enter city name !");
            return;
        }
        try
        {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok)
            {
                setWeatherData(false);
                alert(data.message);
                return;
            }
            setWeatherData(
                {
                    location : data.name,
                    temp : Math.floor(data.main.temp - 273),
                    maxTemp : Math.floor(data.main.temp_max - 273),
                    minTemp : Math.floor(data.main.temp_min - 273),
                    humidity : data.main.humidity,
                    windSpeed : data.wind.speed,
                    iconID : data.weather[0].icon
                }
            );
        }
        catch(error)
        {
            setWeatherData(false);
            alert("! Cant find what you are looking for...\n Check Internet Connection !")
        }
    }

  return (
    <div className = 'weather'>
        <h1>Weather App</h1>
        <div className="search-bar">
            <input type= "text" placeholder = 'Enter city' id="inputText" ref={inputRef}/>
            <img src ={search_icon} alt="Search Icon" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            <img src={`../src/assets/${weatherData.iconID}.png`} alt="" className = 'weather-icon'/>
            <p className='temperature'>{weatherData.temp} °C</p>
            <div className="subtemp">
                <p>Max : {weatherData.maxTemp} °C</p>
                <p>Min : {weatherData.minTemp} °C</p>
            </div>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} KMPH</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>:<></>}
    </div>
  )
}

export default Weather