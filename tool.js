const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// This tool reads the list of label boycotters and artist boycotters, allows adding new names, and formats them alphabetically.

const ARTIST_BOYCOTTERS_URL = "https://nomusicforgenocide.org/page-3-full-list";
const OUTPUT_FILE = path.join(__dirname, "music.html");

// Function to read and parse the list of boycotters
function readBoycotters(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return data
    .split("\n")
    .filter((name) => name.trim() !== "")
    .sort();
}

// Function to add new names to the list
function addBoycotters(filePath, newNames) {
  let boycotters = readBoycotters(filePath);
  boycotters = [...new Set([...boycotters, ...newNames])].sort();
  fs.writeFileSync(filePath, boycotters.join("\n"), "utf-8");
  console.log(`Updated list saved to ${filePath}`);
}

// Function to fetch artist boycotters and update music.html
async function fetchArtistBoycotters() {
  try {
    const response = await fetch(ARTIST_BOYCOTTERS_URL);
    const html = await response.text();

    // Extract artist boycotters from the HTML content
    const artistSectionStart = html.indexOf("ARTISTS");
    const labelSectionStart = html.indexOf("LABELSß");
    const artistContent = html.substring(artistSectionStart, labelSectionStart);

    const artistList = artistContent
      .split("·")
      .map((artist) => artist.trim())
      .filter((artist) => artist.length > 0);

    const artistHTML = `
      <div>
        <h2>Artist Boycotters</h2>
        ${artistList.join(" · ")}
      </div>
    `;

    // Update the music.html file dynamically
    const musicHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Music</title>
  <script src="tool.js" defer></script>
</head>
<body id="music-page">
  <h1 id="page-title">Welcome to the Music Page</h1>
  <div id="artist-boycotters"></div>
</body>
</html>`;

    fs.writeFileSync(OUTPUT_FILE, musicHTML, "utf-8");
    console.log("music.html updated successfully!");
  } catch (error) {
    console.error("Failed to fetch artist boycotters:", error);
  }
}

// Enable CORS
app.use(cors({ origin: "https://nesma-belkhodja.github.io" }));

// Proxy endpoint to fetch artist names
app.get("/api/artists", async (req, res) => {
  try {
    const response = await axios.get(
      "https://nomusicforgenocide.org/page-3-full-list"
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data from the target URL:", error);
    res.status(500).send("Failed to fetch artist names.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});

// Example usage
const artistFilePath = "./artist_boycotters.txt";
const labelFilePath = "./label_boycotters.txt";

// Add new boycotters
addBoycotters(artistFilePath, ["New Artist 1", "New Artist 2"]);
addBoycotters(labelFilePath, ["New Label 1", "New Label 2"]);

fetchArtistBoycotters();

// Read existing boycotters
console.log("Artist Boycotters:", readBoycotters(artistFilePath));
console.log("Label Boycotters:", readBoycotters(labelFilePath));
