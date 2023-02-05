import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox'

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setError(false)
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=0f37ab02447036fdbc2a647af5c1d5a1&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              setPending(false)
              setWeatherData({
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              })
            });
        } else {
          setPending(false)
          setError(true)
        }
      })
  }, []);



  return (
    <section>
      <PickCity onSubmit={handleCityChange} />
      {(weatherData && !pending && !error) && <WeatherSummary {...weatherData} />}
      {pending && <Loader />}
      {error && <ErrorBox>There is no such a city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;