import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function SearchBox() {
    let [city, setCity] = useState("");

    let handleChange = (e)=>{
        setCity(e.target.value);
    }

    let handleSubmit = (e)=>{
        e.preventDefault();
        console.log(city);
    }

    return (
        <div>
            <h3> Search for the Weather</h3>
            <TextField label="City name" variant="outlined" value={city} onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>
                Search
            </Button>
        </div>

    );
}