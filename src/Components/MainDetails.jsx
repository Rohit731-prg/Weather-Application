import React, { useEffect, useState } from 'react';
import sun_logo from '../assets/sun_logo.png';

function MainDetails() {
    const [location, setLocation] = useState('Kolkata');
    const [weatherData, setWeatherData] = useState(null);
    const [advanceData, setAdvanceData] = useState(null);
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);

    // Fetch weather and coordinate data based on location
    async function getdata() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cdc346c153f2ccb8d70233dadf603e67`);
            const data = await response.json();
            console.log('Basic Weather Data:', data);
            setWeatherData(data);
            setLat(data.coord.lat);
            setLon(data.coord.lon);
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }

    // Fetch advanced weather data using coordinates
    async function getAdvancedWeather() {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
            const data = await response.json();
            console.log('Advanced Weather Data:', data);
            setAdvanceData(data);
        } catch (error) {
            console.error('Error fetching advanced weather data:', error);
        }
    }

    useEffect(() => {
        getdata(); // Fetch data on component mount
    }, []);

    useEffect(() => {
        if (lat !== 0 && lon !== 0) {
            getAdvancedWeather(); // Fetch advanced data when coordinates are updated
        }
    }, [lat, lon]);

    return (
        <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="w-1/3 h-full flex flex-col p-6">
                <div className="flex flex-row w-full p-2 h-10 justify-between items-center border-b-2 border-white">
                    <input
                        type="text"
                        className="w-4/5 h-full border-none outline-none bg-transparent text-white"
                        placeholder="Location Kolkata"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button onClick={getdata}>🔍</button>
                </div>
                {weatherData && weatherData.main && (
                    <div className='mt-14 w-full'>
                        <p className="text-7xl text-white font-serif mb-20">
                            {Math.floor(weatherData.main.temp - 273.15)} <span className="text-3xl">°C</span>
                        </p>
                        <p className='text-white text-xl mt-5 font-serif'>Feels Like <span className='text-2xl'>{Math.floor(weatherData.main.feels_like - 273.15)} °C</span></p>
                        <div className='w-full h-auto flex flex-row justify-between mt-5'>
                            <p className='text-white font-serif text-lg'>Temp Max : <span className='text-3xl'>{Math.floor(weatherData.main.temp_max - 273.15)} °C</span></p>
                            <p className='text-white font-serif text-lg'>Temp Min : <span className='text-3xl'>{Math.floor(weatherData.main.temp_min - 273.15)} °C</span></p>
                        </div>
                        <p className='text-white font-serif text-lg mt-7'>humidity<span className='text-3xl ml-2'>{Math.floor(weatherData.main.humidity)} %</span></p>
                        <p className='text-white font-serif text-lg mt-1'>Wind Speed<span className='text-3xl ml-2'>{Math.floor(weatherData.wind.speed)} Km/h</span></p>
                        <p className='mt-16 text-white text-xl '>
                            Experience accurate weather updates with our React JS and Tailwind-powered app, utilizing free APIs for real-time, stylish forecasts!
                        </p>
                    </div>
                )}
                
            </div>
            <div className="h-[95%] w-[2px] bg-white rounded-3xl"></div>
            <div className="w-2/3 h-full">
                {weatherData && weatherData.main && advanceData && advanceData.hourly && (
                    <div className='w-full h-full flex flex-col px-10 justify-end py-5'>
                        <div className='w-full mt-5 h-auto flex flex-row justify-evenly'>
                            <div className='w-2/3 h-full flex flex-col justify-end'>
                                <p className='text-white font-normal text-6xl mb-5'>{weatherData.weather[0].main}</p>
                                <p className='text-white font-normal text-4xl'>{weatherData.weather[0].description}</p>
                            </div>
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="w-1/3 h-full object-cover" />
                        </div>
                        <p className='text-white text-base mt-10'>{weatherData.name}, <span>{new Date().toDateString()},</span><span className='ml-2'>{new Date().toLocaleTimeString()}</span></p>
                        <p className='text-white mt-2 text-2xl font-serif mb-3'>Cloud : {weatherData.clouds.all} %</p>
                        <div className='w-full h-auto flex flex-row justify-between mb-3'>
                        {advanceData.hourly.temperature_2m.map((item, index) => (
                            (index % 3 === 0) && (index <= 23) ? ( // Check if index is in the desired sequence
                                <div key={index} className="w-[14%] h-20 flex flex-col rounded-xl py-5 justify-between">
                                    <p className='text-white text-2xl text-center'>{item}°C</p> {/* Display the temperature */}
                                    <p className='text-xs w-full text-center text-white'>
                                        {new Date(advanceData.hourly.time[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p> {/* Display only the time */}
                                </div>
                            ) : null
                        ))}
                        </div>
                        <div className='w-full h-auto flex flex-row justify-between'>
                            {advanceData.hourly.temperature_2m.map((item, index) => (
                                (index % 24 === 12) && (index <= 156) ? ( // Check if index is in the desired sequence
                                    <div key={index} className="group w-[14%] h-40 flex flex-col bg-black rounded-xl py-5 justify-between hover:bg-white transition-[0.3s] hover:shadow-md hover:shadow-white">
                                        <p className="text-white group-hover:text-black text-2xl text-center">{item}°C</p> {/* Temperature */}
                                        <img src={sun_logo} className="h-1/3 object-contain" />
                                        <p className="text-xs w-full text-center text-white group-hover:text-black">
                                            {new Date(advanceData.hourly.time[index]).toLocaleDateString()}
                                        </p> {/* Date */}
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainDetails;