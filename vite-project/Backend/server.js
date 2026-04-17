import express from "express";
import mongoose from "mongoose";
import cors from "cors";
 


const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://mongoadmin:secret@mongodb:27017/weatherDB?authSource=admin")
  .then(() => console.log("connected to db"))
  .catch((err) => console.error("Error connecting to db:", err));

// Schema
const weatherSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  searchedAt: { type: Date, default: Date.now }
});

const Weather = mongoose.model("Weather", weatherSchema);
 

// POST route (save data)
app.post("/search", async (req, res) => {
  try {
    const { city, country, temperature } = req.body;

    const weather = new Weather({ city, country, temperature });
    await weather.save();

    res.status(201).json({ message: "Weather data saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" ,error: err.message});
  }
});

// GET route (history)
app.get("/history", async (req, res) => {
  try {
    const history = await Weather.find()
      .sort({ searchedAt: -1 })
      .limit(5);

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server (ONLY ONCE)
app.listen(5000, () => {
  console.log("server is running on port 5000");
});