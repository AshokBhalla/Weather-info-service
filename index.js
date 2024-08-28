 
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: 'Please provide a city name' });
    }

    try {
        const apiKey = process.env.WEATHERSTACK_API_KEY;
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
        const weatherData = response.data;
        if (weatherData.error) {
            return res.status(404).send({ error: 'City not found' });
        }

        res.send({
            location: weatherData.location.name,
            temperature: weatherData.current.temperature,
            weather_descriptions: weatherData.current.weather_descriptions[0],
            wind_speed: weatherData.current.wind_speed,
            humidity: weatherData.current.humidity,
        });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


