import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchBox from './searchBox';

export default function InfoBox() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://images.unsplash.com/photo-1502082553048-f009c37129b9"
                title="weather"
            />

            <CardContent>
                {/* ✅ Correct way */}
                <SearchBox />

                <Typography gutterBottom variant="h5" component="div">
                    Weather Info
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Search for a city to get weather details 🌦️
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}