export async function fallbackErrorWeatherFetch(fetchFunc, popUpCreateFunc, API_KEY, maxAttempts = 5) {
  let attempts = 0;
  let urlWeatherNow
  let urlWeatherWeek

  while (attempts < maxAttempts) {
    attempts++;
    let userCity;
    try {
      userCity = await popUpCreateFunc(`Введите название города (попытка ${attempts}/${maxAttempts}):`);
      if (!userCity || typeof userCity !== 'string' || userCity.trim() === '') {
        console.warn('Пользователь не ввёл город или ввёл пустую строку.');
        continue;
      }
      userCity = userCity.trim();
      urlWeatherNow = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`,
      urlWeatherWeek = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${API_KEY}&units=metric&lang=ru`
      console.log(userCity)
      console.log(urlWeatherNow)
      console.log(urlWeatherWeek)
          

      const weatherNow = await fetchFunc(urlWeatherNow);
      const weatherWeek = await fetchFunc(urlWeatherWeek);

      console.log('Данные успешно получены после ручного ввода.');
      return { now: weatherNow, week: weatherWeek };
    } catch (error) {
      console.warn(`Ошибка при получении данных для города "${userCity}" (попытка ${attempts}):`, error.message);

      if (attempts >= maxAttempts) {
        throw new Error(`Превышено максимальное количество попыток (${maxAttempts}). Не удалось получить данные.`);
      }
    }
  }
}