document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const btn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const cityTemperature = document.getElementById('temperature');
    const cityDescription= document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = "f5ec15f51ba12aea82f37f03f34e2952"

    btn.addEventListener('click', async()=> {
        const city = cityInput.value.trim()
        if(!city) return 
          
        try{
         const weatherData = await fetchWeatherData(city)
         displayWeatherData(weatherData)
        }catch(error){
            showError()
        }
    })

    async function fetchWeatherData(city){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

      const response = await fetch(url)
      console.log(typeof response)
      console.log(response)

      if(!response.ok){
        throw new Error("City Not Found")
      }

      const data = await response.json()
      return data
    }

    function displayWeatherData(data){
      console.log(data)
      const {name, main, weather} = data
      cityName.textContent = name;
      cityTemperature.textContent= `Temperature : ${main.temp}`;
      cityDescription.textContent = `Weather: ${weather?.[0]?.description}`;

      weatherInfo.classList.remove('hidden')
      errorMessage.classList.add('hidden')
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})