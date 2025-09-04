console.log("main.js loaded");
const API_KEY = "5f93c30262e8f2e0bd8023dc9133f911";

const modules = [
  import('./api/browser-navigator-api.js'),
  import('./api/weather-api.js'),
  import('./ui/weather-card.js'),
  import('./ui/theme-toggle.js'),
  import('./ui/burger-button.js'),
  import('./ui/popUp.js'),
  import('./ui/fallback.js'),
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
      const fallback = results[6].status === 'fulfilled' ? results[6].value : null;

      const { popUpCreate } = popUpError;
      const { getUserCity } = browserNavigator;
      const { timer } = weatherCard;
      const {fallbackErrorWeatherFetch} = fallback
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
        const { getWeatherData } = weatherApi;
        let weatherDataNow;
        let weatherDataOnWeek;
      try {
        weatherDataNow = await getWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`);
        weatherDataOnWeek = await getWeatherData(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`);
      } catch (error) {
        console.warn("Ошибка запроса данных.\nВозможно некорректное название города", error);

        try {
          const fallbackData = await fallbackErrorWeatherFetch(
            getWeatherData,
            popUpCreate,
            API_KEY
            );
          weatherDataNow = fallbackData.now;
          weatherDataOnWeek = fallbackData.week;
        } catch (fallbackError) {
          userCity = "notFound";
          console.error("Финальный сбой: не удалось получить данные даже с fallback", fallbackError);
        }
      }
      if(userCity !== "notFound"){
        const { updateWeatherInfoUi } = weatherCard;
        updateWeatherInfoUi(weatherDataNow, ".weather-item__value");

        const { updateWeatherForecastWeekUi } = weatherCard;
        updateWeatherForecastWeekUi(weatherDataOnWeek, ".weather-forecast__item");

        const { updateSityName } = weatherCard;
        updateSityName(weatherDataNow);
      }
      }

    } catch (error) {
          console.error('Ошибка в основном потоке:', error);
    }
  })
  .catch(err => {
    console.error('Ошибка при загрузке модулей:', err);
  });