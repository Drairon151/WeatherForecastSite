console.log("main.js loaded");
const API_KEY = "5f93c30262e8f2e0bd8023dc9133f911";

const modules = [
  import('./js/api/weather-api.js'),
  import('./js/ui/weather-card.js'),
  import('./js/ui/theme-toggle.js'),
  import('./js/ui/ad-banner.js'),
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
      const { getUserCity } = await import('./js/api/browser-navigator-api.js');
      const userCity = await getUserCity();

      const url = {
        weatherNow: `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
        weatherOnWeek: `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
      };

      const { getWeatherData } = await import('./js/api/weather-api.js');
      const weatherDataNow = await getWeatherData(userCity, url.weatherNow);
      const weatherDataOnWeek = await getWeatherData(userCity, url.weatherOnWeek);

      const { updateWeatherInfoUi } = await import('./js/ui/weather-card.js');
      await updateWeatherInfoUi(weatherDataNow, ".weather-item__value");

      const { updateWeatherForecastWeekUi } = await import('./js/ui/weather-card.js');
      await updateWeatherForecastWeekUi(weatherDataOnWeek, ".weather-forecast__item");

      const { updateSityName } = await import('./js/ui/weather-card.js');
      await updateSityName(weatherDataNow);

      const { timer } = await import('./js/ui/weather-card.js');
      await timer();

      const { initThemeToggle } = await import('./js/ui/theme-toggle.js');
      await initThemeToggle();

    } catch (error) {
      console.error('Ошибка в основном потоке:', error);
    }
  });