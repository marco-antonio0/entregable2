import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {

    const [ weather, setWeather] = useState({});
    const [ isCelcius, setIsCelcius ] = useState(true);
  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=c1aacae05ccbdece91c242e4f46a843d`)
        .then(res => setWeather(res.data))

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);

  }, [])
    let celcius = (weather.main?.temp - 273.15 );
    let fahrenheit = (celcius * 9 /5 +32); 
    
    const changeDegrees = () => {
      setIsCelcius(!isCelcius)
    }
  return (
    <div className="App">
      <div className='card'>
        <h1>weather App</h1>
        <h2>{weather.name}, {weather.sys?.country}</h2>
        <div className='temperature'>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        </div>{" "}
        {isCelcius ? celcius : fahrenheit} {" "}
        {isCelcius ? "C°" : "F°"}
        <button onClick={changeDegrees}>F°/C°</button>
        <ul>
          <li><span className='description'><b>{weather.weather?.[0].description}</b></span></li>
          <li><b>clouds: </b>{weather.clouds?.all}%</li>
          <li><b>humidity: </b>{weather.main?.humidity}%</li>
          <li><b>wind speed: </b>{weather.wind?.speed} m/s</li>
        </ul>
      </div>
    </div>
  )
}

export default App
