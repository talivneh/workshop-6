# workshop-6

Fork this repo

## Weather App V2

Create a CLI app by using the Commander package, which is capable of fetching and displaying weather data using a clear command line interface.

# Requirements

Your CLI should expose two features (two different commands):

1. `get-temp` - Fetch and display the temperature of a certain city.
   The output should be in the following format:

   Structure: `It's <temp> degrees in <city name>`

   Example: `It's 27.6 degrees in Tel Aviv`

   Arguments:

   - The first argument is the city name (mandatory).
   - Optional argument: `-s`, `--scale` for either `c` (celsius) or `f` (fahrenheit). The default should be celsius.

1. `get-detailed-forecast` **(bonus)** - Fetch and display the detailed weather forecast of a certain city.
   The output should display the following details:

- Weather description
- Min and max temperature
- Wind speed

  Structure: `Today we will have <weather description>, temperatures will range from <min temp> to <max temp> with a wind speed of <wind speed>`

  Example: `Today we will have clear sky, temperatures will range from 26 to 32 degrees with a wind speed of 4.12`

  Arguments:

  - The first argument is the city name (mandatory).
  - Optional argument: `-c` for Celsius format or `-f` for Fahrenheit. The default should be celsius.

# Guidelines

1. Use the node-fetch package in order to call the [openweathermap API](https://openweathermap.org/api) using your existing API key.
2. Your API key should be stored in a `.env` file. Refer to the guidelines in the lecture slides.
3. The required data for both of the commands can be fetched by using the endpoint in [this part](https://openweathermap.org/current#name) of the API reference.
4. Use the `URLSearchParams` native class in order to build the query string, and append it to the request url.
5. Handle errors of your API requests, and write logs on each error which include the command arguments and the error details. You'll be using the logger module that you've published during workflow-5!
6. Create a nice user experience for the users of your CLI - Set a clear description for each command and its arguments.
