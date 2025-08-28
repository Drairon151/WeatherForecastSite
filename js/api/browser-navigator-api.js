const API_KEY = "5f93c30262e8f2e0bd8023dc9133f911"; 

export function getUserCity(){
    return new Promise((resolve, reject)=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                let result = reverseGeocode(lat, lon);
                resolve(result)
                },
                (error) => {
                    console.error("Не удалось получить геолокацию:", error.message);
                    reject(new Error("Не удалось получить геолокацию:"))
                }
            );
        } else {
            console.warn("Геолокация не поддерживается");
            reject(new Error("Геолокация не поддерживается"))
        }
    }
)};

async function reverseGeocode(lat, lon){
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

    try{
        let response = await fetch(url);
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Геокодирование координат пользователя")
        }
        const data = await response.json()
        const city = data[0].state.split(' ')[0]
        return(city)

    }catch(error){
        console.log('Ошибка запроса: ',error.message)
        throw error;
        
    }
}