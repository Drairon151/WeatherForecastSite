// weather-card.js

// update weather now
export async function updateWeatherInfoUi(weatherData, itemClassName){
    let weatherIcon = document.querySelector('.weather__icon')
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    let weatherItems = document.querySelectorAll(itemClassName)
    weatherItems.forEach((weatherItem)=>{
        weatherItem.textContent = takeData(weatherItem,weatherData);
    });
}

export async function updateWeatherForecastWeekUi(weatherDataOnWeek,itemClassName){
    const dailyForecasts = getDailyNoonForecasts(weatherDataOnWeek);

    let weatherItems = document.querySelectorAll(itemClassName)
    weatherItems.forEach((weatherItem, index)=>{

        let weatherItemIcon = weatherItem.querySelector(".weather-forecast__icon")
        let weatherItemDescription = weatherItem.querySelector(".weather-forecast__description")
        let weatherItemDate = weatherItem.querySelector(".weather-forecast__date")
        
        let iconId = `https://openweathermap.org/img/wn/${dailyForecasts[index].weather[0].icon}@2x.png`
        let date = dailyForecasts[index].dt_txt.split(' ')[0];

        weatherItemIcon.src = iconId
        weatherItemDescription.textContent = dailyForecasts[index].weather[0].description
        weatherItemDate.textContent = date

    });

}

export async function updateSityName(weatherData) {
    let titleText = document.querySelector('.city-name')
    titleText.textContent = weatherData.name;
}

function getDailyNoonForecasts(data) {
  return data.list.filter(item => {
    return item.dt_txt.endsWith('12:00:00');
  });
}

function takeData(weatherItem, weatherData){
    let typeWeatherInforms = (weatherItem.dataset.weatherInfoType).split(' ')
    for(let typeWeatherInform of typeWeatherInforms){
        if(Array.isArray(weatherData)){
            weatherData = weatherData[0]
            // Алгоритм работает так. Он проходит по массиву html элементов с нужным тегом, и на каждой итерации
            // он проходится по обьекту данных о погоде используя путь описанный в свойсте html элемента 
        }
        weatherData = weatherData[typeWeatherInform]
    }
    if(!weatherData){
        return "Нет данных"
    }
    return weatherData
}

// timer
export async function timer(){
    setInterval(updateTime, 60000);
    updateTime()
}

function updateTime(){
    let correctDate = new Date();
    let dateElement = document.querySelector(".current-weather__date");

    const day = correctDate.getDate().toString().padStart(2, '0');
    const month = (correctDate.getMonth() + 1).toString().padStart(2, '0');
    const year = correctDate.getFullYear();
    const hours = correctDate.getHours().toString().padStart(2, '0');
    const minutes = correctDate.getMinutes().toString().padStart(2, '0');

    dateElement.textContent = `${day}.${month}.${year} | ${hours}:${minutes}`;

}
