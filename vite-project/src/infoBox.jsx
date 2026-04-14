import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchBox from './searchBox';
import { useState } from "react";

export default function InfoBox() {

    let [weatherInfo, setWeatherInfo] = useState({});

    let updateWeather = (newInfo) => {
    setWeatherInfo(newInfo);
}
    
    return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <SearchBox updateWeather={updateWeather} />
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://images.unsplash.com/photo-1502082553048-f009c37129b9"
                title="weather"
            />

            <CardContent>
                {/* ✅ Correct way */}
                
                
                <Typography gutterBottom variant="h5" component="div">
                    {weatherInfo.city ? `Weather in ${weatherInfo.city}` : "Weather App"}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <div>
                        {weatherInfo.description ? `Description: ${weatherInfo.description}` : ""}
                    </div>
                    <div>
                        {weatherInfo.temp ? `Temperature: ${weatherInfo.temp}°C` : ""}
                    </div>
                    <div>
                        {weatherInfo.humidity ? `Humidity: ${weatherInfo.humidity}%` : ""}
                    </div>
                    {weatherInfo.tempmax && weatherInfo.tempmin ? `Temperature Range: ${weatherInfo.tempmin}°C - ${weatherInfo.tempmax}°C` : ""}
                    <div>
                        {weatherInfo.feelsLike ? `Feels Like: ${weatherInfo.feelsLike}°C` : ""}
                    </div>
                    {weatherInfo.country ? `Country: ${weatherInfo.country}` : ""}
                </Typography>
            </CardContent>

        </Card>
    </div>
    );
}