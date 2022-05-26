import dotenv from "dotenv";
import fetch from "node-fetch";
import { Command } from "commander";
import { mondayuLogger } from "mondayu-logger";

dotenv.config();

const API_KEY = process.env.API_KEY;
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const UNITS = {
  STANDARD: "standard",
  METRIC: "metric",
};
const SCALES = {
  CELSIUS: "c",
  FAHRENHEIT: "f",
};
const SCALE_ARG_DESCRIPTION =
  "Temperature scale - either c for celsius or f for fahrenheit";

async function fetchCityWeatherData(cityName, units) {
  try {
    const queryString = new URLSearchParams({
      q: cityName,
      units,
      appId: API_KEY,
    }).toString();
    const requestUrl = `${WEATHER_API_BASE_URL}/weather?${queryString}`;
    const response = await fetch(requestUrl);
    const weatherData = await response.json();

    return weatherData;
  } catch (err) {
    mondayuLogger.log("Error on weather data fetch:", err);
    throw err;
  }
}

function convertScaleToUnits(scale) {
  switch (scale) {
    case SCALES.CELSIUS: {
      return UNITS.METRIC;
    }
    case SCALES.FAHRENHEIT: {
      return UNITS.STANDARD;
    }
    default: {
      return UNITS.METRIC;
    }
  }
}

function getCommanderProgram() {
  const program = new Command();

  program
    .name("weather-app")
    .description("Use the weather app to get up to date weather data!")
    .version("1.0.0");

  program
    .command("get-temp")
    .description("Displays the temp of a certain city")
    .argument("<string>", "City name")
    .option("-s, --scale <string>", SCALE_ARG_DESCRIPTION, SCALES.CELSIUS)
    .action(async (cityName, options) => {
      const units = convertScaleToUnits(options.scale);
      const weatherData = await fetchCityWeatherData(cityName, units);
      const { temp } = weatherData.main;

      console.log(`It's ${temp} degrees in ${cityName}`);
    });

  program
    .command("get-detailed-forecast")
    .description("Displays in depth information about today's weather forecast")
    .argument("<string>", "City name")
    .option("-s, --scale <string>", SCALE_ARG_DESCRIPTION, SCALES.CELSIUS)
    .action(async (cityName, options) => {
      const units = convertScaleToUnits(options.scale);
      const weatherData = await fetchCityWeatherData(cityName, units);
      const { description: weatherDescription } = weatherData.weather[0];
      const { temp_min: minTemp, temp_max: maxTemp } = weatherData.main;
      const { speed: windSpeed } = weatherData.wind;

      console.log(
        `Today we will have ${weatherDescription}, temperatures will range from ${minTemp} to ${maxTemp} degrees with a wind speed of ${windSpeed}`
      );
    });

  return program;
}

const program = getCommanderProgram();
program.parse();
