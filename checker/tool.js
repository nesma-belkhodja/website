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

// Helper function to normalize names for alphabetization
function normalizeForSorting(name) {
  // Check if the name contains both Arabic/non-Latin and Latin parts separated by " - "
  if (name.includes(" - ")) {
    const parts = name.split(" - ");
    // Look for the part that contains Latin characters (usually the transliteration)
    for (const part of parts) {
      const latinMatch = part.match(/[a-zA-Z]/);
      if (latinMatch) {
        return part.toLowerCase().trim();
      }
    }
  }
  
  // Extract Latin characters and common punctuation for sorting
  const latinPart = name
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
    .match(/[a-zA-Z0-9\s\-\.\']+/g); // Extract Latin characters, numbers, spaces, hyphens, periods, apostrophes

  // If we found Latin characters, use them for sorting
  if (latinPart && latinPart.length > 0) {
    return latinPart.join(" ").toLowerCase().trim();
  }

  // Fallback: if no Latin characters found, use the original name
  return name.toLowerCase().trim();
}

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
    .sort((a, b) =>
      normalizeForSorting(a).localeCompare(normalizeForSorting(b))
    );
}

// Function to add new names to the list
function addBoycotters(filePath, newNames) {
  let boycotters = readBoycotters(filePath);
  boycotters = [...new Set([...boycotters, ...newNames])].sort((a, b) =>
    normalizeForSorting(a).localeCompare(normalizeForSorting(b))
  );
  fs.writeFileSync(filePath, boycotters.join("\n"), "utf-8");
  console.log(`Updated list saved to ${filePath}`);
}

// Enable CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "https://nesma-belkhodja.github.io",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
      ];

      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      return callback(null, true); // Allow all origins for local development
    },
    credentials: true,
  })
);

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

// Read existing boycotters
console.log("Artist Boycotters:", readBoycotters(artistFilePath));
console.log("Label Boycotters:", readBoycotters(labelFilePath));
