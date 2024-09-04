import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=629f7aaaee7ef090a1ba0762c171d647&units=metric`;

        console.log('Запрос к OpenWeatherMap:', apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            console.error('Ошибка OpenWeatherMap API:', data.message);
            return res.status(response.status).json({ error: data.message });
        }

        res.json(data);
    } catch (error) {
        console.error('Ошибка сервера:', error.message);
        res.status(500).json({ error: 'Ошибка при получении данных с OpenWeatherMap' });
    }
});

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});
