console.log("main.js loaded");
const API_KEY = "5f93c30262e8f2e0bd8023dc9133f911";

const modules = [
  import('./api/browser-navigator-api.js'),
  import('./api/weather-api.js'),
  import('./ui/weather-card.js'),
  import('./ui/theme-toggle.js'),
  import('./ui/burger-button.js'),
  import('./ui/popUp.js'),
];


Promise.allSettled(modules)
  .then(async (results) => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log('Модуль загружен');
      } else {
        console.error('Ошибка загрузки модуля', result.reason);
      }
    });

    try {
      const browserNavigator = results[0].status === 'fulfilled' ? results[0].value : null;
      const weatherApi = results[1].status === 'fulfilled' ? results[1].value : null;
      const weatherCard = results[2].status === 'fulfilled' ? results[2].value : null;
      const themeToggle = results[3].status === 'fulfilled' ? results[3].value : null;
      const burgerButton = results[4].status === 'fulfilled' ? results[4].value : null;
      const popUpError = results[5].status === 'fulfilled' ? results[5].value : null;
      const { popUpCreate } = popUpError;
      const { getUserCity } = browserNavigator;
      const { timer } = weatherCard;
      timer();

      const { initThemeToggle } = themeToggle;
      initThemeToggle();

      const { initBurgerButton } = burgerButton;
      initBurgerButton();
      let userCity;
      try{
        userCity = await getUserCity();
        console.log(userCity)
      }catch(error){
        console.warn("Не удалось определить город", error.message)
        userCity = await popUpCreate('Не удалось определить город, введите его вручную');
      }
      
      if(userCity !== "clickOutPopUp"){
        const url = {
          weatherNow: `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
          weatherOnWeek: `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
        };

        const { getWeatherData } = weatherApi;
        const weatherDataNow = await getWeatherData(userCity, url.weatherNow);
        const weatherDataOnWeek = await getWeatherData(userCity, url.weatherOnWeek);

        const { updateWeatherInfoUi } = weatherCard;
        updateWeatherInfoUi(weatherDataNow, ".weather-item__value");

        const { updateWeatherForecastWeekUi } = weatherCard;
        updateWeatherForecastWeekUi(weatherDataOnWeek, ".weather-forecast__item");

        const { updateSityName } = weatherCard;
        updateSityName(weatherDataNow);

      }

    } catch (error) {
          console.error('Ошибка в основном потоке:', error);
    }
  })
  .catch(err => {
    console.error('Ошибка при загрузке модулей:', err);
  });