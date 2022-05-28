// Recommended order for your solution:
// 1. Install the dotenv package.
// 2. Add a dotenv file, put the API key in dotenv and print it.
// 3. Install the node-fetch package.
// 4. Create a method that calls the API to get temperature using node-fetch.
// 5. Install the commander package.
// 6. Create a basic commander skeleton without the actions implementation (just the metadata and commands configuration).
// 7. Implement the first command, including the optional arguments.
// 8. BONUS - Implement the second command.

// Commander usage example for your reference:
import { Command } from "commander";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const program = new Command();
const apiKey = process.env.WEATHER_API_KEY;

async function getTemp(city, type = "c") {
  switch (type) {
    case "c":
      "metric";
      break;
    case "f":
      "imperial";
      break;
  }

  const apiRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${type}`
  );
  const currentTemp = await apiRes.json();

  return currentTemp.main.temp;
}

program
  .name("cli-weather")
  .description("get current weathet in your CLI")
  .version("1.0.0");

program
  .command("get-temp")
  .description("Fetch and display the temperature of a certain city")
  .argument("<city name>", "city name")
  // .option("-t, --type <string>", "Type of temp", "celsious")
  .action((cityName) => {
    getTemp(cityName).then((resault) => {
      console.log(`Result: The current temp in ${cityName} is ${resault}`);
    });
  });

program.parse();
