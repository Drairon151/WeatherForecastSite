export async function getWeatherData(city, url){
    try{
        let response = await fetch(url);
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка запроса прогноза погоды на день")
        }
        const data = await response.json()

        return(data)

    }catch(error){
        console.log('Ошибка запроса: ',error.message)
        throw error;
        
    }
}