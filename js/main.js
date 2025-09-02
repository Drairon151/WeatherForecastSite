console.log("main.js loaded");
const API_KEY = "5f93c30262e8f2e0bd8023dc9133f911";

// ✅ Правильные пути: от текущей папки (js/) — без "/js/" в начале
const modules = [
  import('./api/weather-api.js'),
  import('./ui/weather-card.js'),
  import('./ui/theme-toggle.js'),
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
  })
  .then(async () => {
    try {
      // ✅ Так же: от текущей папки
      const { getUserCity } = await import('./api/browser-navigator-api.js');
      const userCity = await getUserCity();

      const url = {
        weatherNow: `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
        weatherOnWeek: `http://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
      };

      const { getWeatherData } = await import('./api/weather-api.js');
      const weatherDataNow = await getWeatherData(userCity, url.weatherNow);
      const weatherDataOnWeek = await getWeatherData(userCity, url.weatherOnWeek);

      const { updateWeatherInfoUi } = await import('./ui/weather-card.js');
      await updateWeatherInfoUi(weatherDataNow, ".weather-item__value");

      const { updateWeatherForecastWeekUi } = await import('./ui/weather-card.js');
      await updateWeatherForecastWeekUi(weatherDataOnWeek, ".weather-forecast__item");

      const { updateSityName } = await import('./ui/weather-card.js');
      await updateSityName(weatherDataNow);

      const { timer } = await import('./ui/weather-card.js');
      await timer();

      const { initThemeToggle } = await import('./ui/theme-toggle.js');
      await initThemeToggle();

    } catch (error) {
      console.error('Ошибка в основном потоке:', error);
    }
  });