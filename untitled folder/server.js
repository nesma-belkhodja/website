const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/rsvpDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// RSVP Schema and Model
const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  plusOne: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RSVP = mongoose.model("RSVP", rsvpSchema);

// Routes
// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.get("/api/rsvps", async (req, res) => {
  try {
    const rsvps = await RSVP.find();
    res.json(rsvps);
  } catch (err) {
    console.error("Error fetching RSVPs:", err); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch RSVPs", details: err.message });
  }
});

app.post("/api/rsvps", async (req, res) => {
  try {
    const newRSVP = new RSVP(req.body);
    await newRSVP.save();
    res.status(201).json(newRSVP);
  } catch (err) {
    res.status(400).json({ error: "Failed to create RSVP" });
  }
});

app.delete("/api/rsvps/:id", async (req, res) => {
  try {
    await RSVP.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete RSVP" });
  }
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
