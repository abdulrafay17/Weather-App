import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

const port = 3000;
const app = express();

const API_URL = 'http://api.weatherapi.com/v1/current.json?';
const yourApiKey = process.env.API_KEY;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        content: "Enter City",
        countryName: "Country",
        windSpeed: "km/h",
        humidity: '%',
        icon: "/images/weather.png",
        cloud: "N/A",
        feelLike: "N/A",
        visiblity: "N/A",
        pressure: "N/A",
        windDegree: "N/A"
    });
  });

app.post("/", async (req, res) => {
    const searchId = req.body.enterCity;


    try {
      const result = await axios.get(`${API_URL}key=${yourApiKey}&q=${searchId}&aqi=no`)
      res.render('index.ejs', { 
        content: Math.floor(result.data.current.temp_c) + ' °C',
        countryName: result.data.location.name,
        windSpeed: result.data.current.wind_kph + " km/h",

        humidity: result.data.current.humidity + " %",
        icon: result.data.current.condition.icon,

        // not in use
        cloud: result.data.current.cloud + '%',
        feelLike: result.data.current.feelslike_c + "°C",
        visiblity: result.data.current.vis_km + " km Visibility",
        pressure: result.data.current.pressure_mb + " mb Pressure",
        windDegree: result.data.current.wind_degree + " ° Wind",
       });
    } catch (error) {
      res.send(error.message);
    }
  });

app.listen(port, ()=> {
    console.log(`server has started on port ${port}`);
})