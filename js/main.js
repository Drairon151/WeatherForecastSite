// scripts loader

// const weatherData = {
//   coord: {
//     lon: 32.04,
//     lat: 54.7817
//   },
//   weather: [
//     {
//       id: 804,
//       main: "Clouds",
//       description: "пасмурно",
//       icon: "04n"
//     }
//   ],
//   base: "stations",
//   main: {
//     temp: 14.18,
//     feels_like: 14.06,
//     temp_min: 14.18,
//     temp_max: 14.18,
//     pressure: 1020,
//     humidity: 92,
//     sea_level: 1020,
//     grnd_level: 995
//   },
//   visibility: 10000,
//   wind: {
//     speed: 4.06,
//     deg: 307,
//     gust: 7.98
//   },
//   clouds: {
//     all: 100
//   },
//   dt: 1754676699,
//   sys: {
//     country: "RU",
//     sunrise: 1754619256,
//     sunset: 1754674846
//   },
//   timezone: 10800,
//   id: 491687,
//   name: "Смоленск",
//   cod: 200
// };

console.log("main.js loaded")
const API_KEY = "5f93c30262e8f2e0bd8023dc9133f911";


const modules = [
  import('/js/api/weather-api.js'),
  import('/js/ui/weather-card.js'),
  import('/js/ui/theme-toggle.js'),
  import('/js/ui/ad-banner.js'),
];

Promise.allSettled(modules)
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log('✅ Модуль загружен');
      } else {
        console.error('❌', result.reason);
      }
    });    
  }).then(async ()=>{
      const { getUserCity } = await import('./api/browser-navigator-api.js');
      const userCity = await getUserCity();

      const url = {
        weatherNow: `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
        weatherOnWeek: `http://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
      }

      const { getWeatherData } = await import('./api/weather-api.js');
      const weatherDataNow = await getWeatherData(userCity, url.weatherNow);
      const weatherDataOnWeek = await getWeatherData(userCity, url.weatherOnWeek);
 
      const { updateWeatherInfoUi } = await import('./ui/weather-card.js');
      await updateWeatherInfoUi(weatherDataNow,".weather-item__value");
      
      const { updateWeatherForecastWeekUi } = await import('./ui/weather-card.js');
      await updateWeatherForecastWeekUi(weatherDataOnWeek,".weather-forecast__item");
      
      const { timer } = await import('./ui/weather-card.js');
      await timer();
  })
  