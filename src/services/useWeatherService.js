
export const getCityWeather = async (lat, lon) => {
    const _api = '655e2ddee2644584a78649dce457b304';
    const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${_api}&lang=ru`;
    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const res = await response.json();

        return res;
    } catch (error) {
        console.error('Ошибка при запросе погоды:', error);
        throw error;
    }
};

